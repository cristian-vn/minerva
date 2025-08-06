use serde_json::Value;
use sqlx::{PgPool, Row};
use std::collections::HashMap;
use crate::models::user::User;

#[tauri::command]
pub async fn sign_in(username: String, password: String, pool: tauri::State<'_, sqlx::PgPool>) -> Result<User, String> {
  let query = format!("SELECT id, username FROM users WHERE username = {} AND password = {}", username, password);
  let user = sqlx::query_as::<_, User>(&query)
    .fetch_optional(pool.inner())
    .await
    .map_err(|e| e.to_string())?;

  user.ok_or_else(|| "Invalid credentials".to_string())
}

#[tauri::command]
pub async fn get_users(pool: tauri::State<'_, PgPool>) -> Result<Vec<HashMap<String, Value>>, String> {
    let rows = sqlx::query("SELECT id, username, email FROM users")
        .fetch_all(pool.inner())
        .await
        .map_err(|e| e.to_string())?;

    let mut results = Vec::new();

    for row in rows {
        let mut map = HashMap::new();
        map.insert("id".to_string(), Value::from(row.get::<i32, _>("id")));
        map.insert("username".to_string(), Value::from(row.get::<String, _>("username")));
        map.insert("email".to_string(), Value::from(row.get::<String, _>("email")));

        results.push(map);
    }

    Ok(results)
}


