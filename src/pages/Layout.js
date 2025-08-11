import { useMantineTheme, AppShell, Container, Tabs } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../services/AuthContext";
import { Outlet  } from "react-router-dom";

import { NavUsers } from '../components/navs/NavUsers';

import TitleBar from '../components/TitleBar';
import classes from './HeaderTabs.module.css';

const tabs = [
  { title: "Escuelas", value: "schools", disabled: false },
  { title: "Usuarios", value: "users", disabled: false },
  { title: "Alumnos", value: "students", disabled: false },
  { title: "Docentes", value: "teachers", disabled: false },
  { title: "Empleados", value: "employees", disabled: false },
  { title: "Programas", value: "programs", disabled: false },
  { title: "Planes", value: "plans", disabled: false },
  { title: "Pagos", value: "payments", disabled: true },
];

function Layout() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { tabValue } = useParams();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.value} key={tab.title} disabled={tab.disabled}>
      {tab.title}
    </Tabs.Tab>
  ));

  return (
    <AppShell padding="md" header={{ height: 104 }}>
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
            {items}
            <Tabs.Tab value='logout' onClick={handleLogout}>Cerrar sesión</Tabs.Tab>
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
            <Tabs.Panel value="users"><NavUsers /></Tabs.Panel>
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
          minHeight: 'calc(100vh - 36px)',
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Layout;
