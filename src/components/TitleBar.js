import { IconSettings2, IconMaximize, IconMinus, IconX } from '@tabler/icons-react';
import { Group, Title, Box, ActionIcon } from '@mantine/core';
import { getCurrentWindow } from "@tauri-apps/api/window";

import "./TitleBar.css";

function TitleBar() {
  const appWindow = getCurrentWindow();

  return (
    <Box
      data-tauri-drag-region // Permite arrastrar la ventana
      display="flex"
      style={{
        alignItems: "center",
        cursor: "default",
        height: "36px"
      }}
    >
      <Title order={5}
        data-tauri-drag-region
        userSelect="none"
        className="titlebar__title"
      >
        Minerva
      </Title>

      <Group
        spacing="xs"
        display="flex"
        gap="0"
        style={{
          marginLeft: "auto",
          height: "100%"
        }}
      >
        <ActionIcon
          size="xs"
          variant="subtle"
          color="white"
          className="titlebar__controls__button"
        >
          <IconSettings2 size={16} />
        </ActionIcon>
        <ActionIcon
          onClick={() => appWindow.minimize()}
          size="xs"
          variant="subtle"
          color="white"
          className="titlebar__controls__button"
        >
          <IconMinus size={16} />
        </ActionIcon>
        <ActionIcon
          onClick={() => appWindow.toggleMaximize()}
          size="xs"
          variant="subtle"
          color="white"
          className="titlebar__controls__button"
        >
          <IconMaximize size={16} />
        </ActionIcon>
        <ActionIcon
          onClick={() => appWindow.close()}
          size="xs"
          variant="subtle"
          color="white"
          className="titlebar__controls__button titlebar__controls__button__x"
        >
          <IconX size={16} />
        </ActionIcon>
      </Group>
    </Box>
  )
}

export default TitleBar;