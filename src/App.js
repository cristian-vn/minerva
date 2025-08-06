import { useMantineTheme, AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

import TitleBar from './components/TitleBar';

function App() {
  const [opened, { toggle }] = useDisclosure();
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
      header={{ height: 72 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header
        style={{
          backgroundColor: theme.colors.dark[9],
        }}
      >
        <TitleBar />
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          background: theme.colors.dark[0],
          color: theme.colors.dark[0],
        }}
      ></AppShell.Navbar>

      <AppShell.Main
        style={{
          background: theme.colors.gray[0],
        }}
      >
        <div>
          <h1>Usuarios</h1>
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
