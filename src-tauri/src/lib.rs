//use tauri::Manager;
use sqlx::postgres::PgPoolOptions;
use dotenvy::dotenv;
use std::env;

pub mod handlers;
pub mod models;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
#[warn(dead_code)]
#[tokio::main]
pub async fn run() {
  dotenv().ok();

  let database_url = env::var("DATABASE_URL").expect("DATABASE_URL is not defined");
  let pool = PgPoolOptions::new()
    .max_connections(5)
    .connect(&database_url)
    .await
    .expect("Error connecting to the database");

  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .manage(pool)
    .invoke_handler(tauri::generate_handler![
      handlers::user::register_admin,
      handlers::user::register,
      handlers::user::login,
      handlers::user::get_users,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
