use chrono::NaiveDateTime;
use serde::{Serialize, Deserialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
  pub id: i32,
  pub username: String,
  pub password: String,
  pub email: String,
  pub created_at: NaiveDateTime,
  pub last_login: NaiveDateTime,
  pub is_active: bool,
}
