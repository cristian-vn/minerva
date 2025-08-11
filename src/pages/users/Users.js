import { Container, Title, Table } from '@mantine/core';
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
      <Title order={2} mb={16}>Usuarios</Title>
      <Table.ScrollContainer type="native" bg={"white"} style={{ border: "1px solid var(--mantine-color-gray-3)", borderRadius: "8px" }}>
        <Table>
          <Table.Thead style={{ backgroundColor: "var(--mantine-color-gray-1)", display: "sticky", top: 0 }}>
            <Table.Tr>
              <Table.Th>Username</Table.Th>
              <Table.Th>Activo?</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {users.map((u) => (
              <Table.Tr key={u.id}>
                <Table.Td>{u.username}</Table.Td>
                <Table.Td>{u.is_active ? "Si" : "No" }</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
};

export default Users;