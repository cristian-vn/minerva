import {
  useMantineTheme,
  Button,
  Container,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, useEffect } from "react";
import { invoke } from '@tauri-apps/api/core';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

import classes from './AuthenticationTitle.module.css';

export default function Login() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/schools");
    }
  });

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const user = await invoke("login", { username, password });
      login(user); // Guardar en contexto y localStorage
      navigate("/"); // redirigir
    } catch (err) {
      setError(err);
    }
  }

  return (
    <Container
      fluid
      style={{
        backgroundColor: theme.colors.gray[0],
        height: "calc(100vh - 36px)",
        padding: 0
      }}
    >
      <Container size={420} py={36}>
        <Title ta="center" className={classes.title}>Iniciar sesión</Title>
        <form withBorder onSubmit={handleLogin} shadow="sm" p={22} mt={36} radius="md">
          <TextInput label="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required radius="md" />
          <PasswordInput label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required mt="md" radius="md" />
          <Button fullWidth type="submit" mt="xl" radius="md">Acceder</Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </Container>
    </Container>
  );
}
