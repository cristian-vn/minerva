-- Add migration script here

-- Tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Tabla de permisos
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- Relación usuario-rol (muchos-a-muchos)
CREATE TABLE user_roles (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);

-- Relación rol-permiso (muchos-a-muchos)
CREATE TABLE role_permissions (
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

INSERT INTO roles (name) VALUES ('admin');

INSERT INTO permissions (name) VALUES 
('consultar_roles'),
('consultar_rol'),
('crear_rol'),
('editar_rol'),
('eliminar_rol'),
('consultar_usuarios'),
('consultar_usuario'),
('crear_usuario'),
('editar_usuario');

-- Asignar permisos a "admin"
INSERT INTO role_permissions (role_id, permission_id)
SELECT 1, id FROM permissions;
