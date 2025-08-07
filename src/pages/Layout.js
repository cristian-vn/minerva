import { useMantineTheme, AppShell, Container, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { Outlet  } from "react-router-dom";

import TitleBar from '../components/TitleBar';
import classes from './HeaderTabs.module.css';

function Layout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { tabValue } = useParams();

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
          value={tabValue}
          onChange={(value) => navigate(`/${value}`)}
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
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
