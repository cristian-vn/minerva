import { Container, Title, List } from '@mantine/core';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    invoke("get_users")
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container
      fluid
      style={{
        padding: 0
      }}
    >
      <Title order={2}>Usuarios</Title>
      <List>
        {users.map((u) => (
          <List.Item key={u.id}>{u.username}</List.Item>
        ))}
      </List>
    </Container>
  );
};

export default Users;