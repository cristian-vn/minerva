use serde_json::Value;
use std::collections::HashMap;
use sqlx::{Row};

use argon2::password_hash::{SaltString, PasswordHash, rand_core::OsRng};
use argon2::{Argon2, PasswordVerifier, PasswordHasher};

fn hash_password(password: &str) -> Result<String, String> {
  let salt = SaltString::generate(&mut OsRng);
  let argon2 = Argon2::default();
  let hash = argon2.hash_password(password.as_bytes(), &salt)
    .map_err(|e| e.to_string())?
    .to_string();
  Ok(hash)
}

#[tauri::command]
pub async fn register_admin(
  pool: tauri::State<'_, sqlx::PgPool>
) -> Result<(), String> {
  // 1. Revisar si ya existe un admin
  let exists: Option<i32> = sqlx::query_scalar(
    r#"
    SELECT u.id
    FROM users u
    JOIN user_roles ur ON ur.user_id = u.id
    JOIN roles r ON r.id = ur.role_id
    WHERE r.name = 'admin'
    LIMIT 1
    "#
  )
  .fetch_optional(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  if exists.is_some() {
    println!("✅ Admin ya existe, no se crea otro");
    return Ok(());
  }

  // 2. Crear usuario admin
  let password_hash = hash_password("admin123")?; // Puedes cambiarlo y pedir al admin que lo cambie luego

  let user_id: i32 = sqlx::query_scalar(
    "INSERT INTO users (username, password_hash, is_active) VALUES ($1, $2, TRUE) RETURNING id"
  )
  .bind("Admin")
  .bind(&password_hash)
  .fetch_one(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  // 3. Asignar rol admin
  sqlx::query(
    "INSERT INTO user_roles (user_id, role_id) SELECT $1, id FROM roles WHERE name = 'admin'"
  )
  .bind(user_id)
  .execute(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  println!("✅ Admin creado con éxito (usuario: Admin, pass: admin123)");

  Ok(())
}


#[tauri::command]
pub async fn register(
  pool: tauri::State<'_, sqlx::PgPool>,
  username: String,
  password: String,
  role: String // ejemplo: "admin", "profesor"
) -> Result<String, String> {
  // 1. Generar hash
  let password_hash = hash_password(&password)?;

  // 2. Insertar usuario
  let user_id: i32 = sqlx::query_scalar(
    "INSERT INTO users (username, password_hash, is_active) VALUES ($1, $2, TRUE) RETURNING id"
  )
  .bind(&username)
  .bind(&password_hash)
  .fetch_one(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  // 3. Asignar rol
  sqlx::query(
    "INSERT INTO user_roles (user_id, role_id) SELECT $1, id FROM roles WHERE name = $2"
  )
  .bind(user_id)
  .bind(&role)
  .execute(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  Ok("Usuario registrado con éxito".into())
}

#[tauri::command]
pub async fn login(
  pool: tauri::State<'_, sqlx::PgPool>,
  username: String,
  password: String
) -> Result<Value, String> {
  // 1. Buscar usuario
  let row = sqlx::query("SELECT id, username, password_hash, is_active FROM users WHERE username = $1")
    .bind(&username)
    .fetch_optional(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

  let user = match row {
    Some(u) => u,
    None => return Err("Usuario no encontrado".into()),
  };

  if !user.get::<bool, _>("is_active") {
    return Err("Usuario inactivo".into());
  }

  // 2. Verificar contraseña
  let password_hash: String = user.get("password_hash");
  let parsed_hash = PasswordHash::new(&password_hash).map_err(|e| e.to_string())?;
  Argon2::default()
    .verify_password(password.as_bytes(), &parsed_hash)
    .map_err(|_| "Contraseña incorrecta".to_string())?;

  let user_id: i32 = user.get("id");

  // 3. Obtener roles
  let roles: Vec<String> = sqlx::query_scalar(
    r#"
    SELECT r.name
    FROM roles r
    JOIN user_roles ur ON ur.role_id = r.id
    WHERE ur.user_id = $1
    "#
  )
  .bind(user_id)
  .fetch_all(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  // 4. Obtener permisos
  let permissions: Vec<String> = sqlx::query_scalar(
    r#"
    SELECT p.name
    FROM permissions p
    JOIN role_permissions rp ON rp.permission_id = p.id
    JOIN user_roles ur ON ur.role_id = rp.role_id
    WHERE ur.user_id = $1
    "#
  )
  .bind(user_id)
  .fetch_all(pool.inner())
  .await
  .map_err(|e| e.to_string())?;

  // 5. Retornar usuario + roles + permisos
  Ok(serde_json::json!({
    "id": user_id,
    "username": user.get::<String, _>("username"),
    "roles": roles,
    "permissions": permissions
  }))
}

#[tauri::command]
pub async fn get_users(
  pool: tauri::State<'_, sqlx::PgPool>
) -> Result<Vec<HashMap<String, Value>>, String> {
  let rows = sqlx::query("SELECT id, username FROM users")
    .fetch_all(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

  let mut results = Vec::new();

  for row in rows {
    let mut map = HashMap::new();
    map.insert("id".to_string(), Value::from(row.get::<i32, _>("id")));
    map.insert("username".to_string(), Value::from(row.get::<String, _>("username")));

    results.push(map);
  }

  Ok(results)
}


