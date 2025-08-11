import { IconUsersGroup, IconUserPlus, IconCircles, IconCirclePlus } from '@tabler/icons-react';
import { Flex, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { Link } from "react-router-dom";
import classes from './ActionsNav.module.css';

const mockdata = [
  { title: "Usuarios", icon: IconUsersGroup, color: "dark", route: "/users" },
  { title: "Añadir usuario", icon: IconUserPlus, color: "dark", route: "/" },
  { title: "Roles", icon: IconCircles, color: "dark", route: "/" },
  { title: "Añadir rol", icon: IconCirclePlus, color: "dark", route: "/" },
];

export function NavUsers() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <Link to={item.route} key={item.title} className={classes.links}>
      <UnstyledButton key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size={28} />
        <Text size="xs" mt={4}>{item.title}</Text>
      </UnstyledButton>
    </Link>
  ));

  return (
    <Flex mih={50} gap="sm" wrap="wrap" className={classes.content}>
      {items}
    </Flex>
  );
}