import { useMantineTheme, AppShell, Title, Container, Tabs } from '@mantine/core';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

import TitleBar from './components/TitleBar';
import classes from './HeaderTabs.module.css';

function App() {
  const [users, setUsers] = useState([]);
  const theme = useMantineTheme();

  useEffect(() => {
    invoke("get_users")
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AppShell
      padding="md"
      header={{ height: 144 }}
    >
      <AppShell.Header
        style={{
          backgroundColor: theme.colors.gray[9],
          border: 0
        }}
      >
        <TitleBar />
        <Tabs
          defaultValue="schools"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab
          }}
        >
          <Tabs.List>
            <Tabs.Tab value="schools">Escuelas</Tabs.Tab>
            <Tabs.Tab value="users">Usuarios</Tabs.Tab>
            <Tabs.Tab value="students">Alumnos</Tabs.Tab>
            <Tabs.Tab value="teachers">Docentes</Tabs.Tab>
            <Tabs.Tab value="employees">Empleados</Tabs.Tab>
            <Tabs.Tab value="programs">Programas</Tabs.Tab>
            <Tabs.Tab value="plans">Planes</Tabs.Tab>
            <Tabs.Tab value="payments" disabled>Pagos</Tabs.Tab>
          </Tabs.List>
          <Container
            fluid
            size="sm"
            style={{
              backgroundColor: theme.colors.gray[2],
              borderBottom: `1px solid ${theme.colors.gray[4]}`,
              color: theme.colors.gray[8],
              padding: '8px 16px',
              height: '72px',
            }}
          >
            <Tabs.Panel value="schools">Schools tab content</Tabs.Panel>
            <Tabs.Panel value="users">Users tab content</Tabs.Panel>
            <Tabs.Panel value="students">Students tab content</Tabs.Panel>
            <Tabs.Panel value="teachers">Teachers tab content</Tabs.Panel>
            <Tabs.Panel value="employees">Employees tab content</Tabs.Panel>
            <Tabs.Panel value="programs">Programs tab content</Tabs.Panel>
            <Tabs.Panel value="plans">Plans tab content</Tabs.Panel>
            <Tabs.Panel value="payments">Payments tab content</Tabs.Panel>
          </Container>
        </Tabs>
      </AppShell.Header>
      <AppShell.Main
        style={{
          background: theme.colors.gray[0],
        }}
      >
        <div>
          <Title order={2}>Escuelas</Title>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.username} - {u.email}</li>
            ))}
          </ul>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
