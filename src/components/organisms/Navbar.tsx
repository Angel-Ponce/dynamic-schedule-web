import React from "react";
import {
  Group,
  Navbar as MantineNavbar,
  UnstyledButton,
  Text,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import {
  IoCalendarClear,
  IoCheckmarkCircle,
  IoDocument,
  IoSettings,
  IoTime,
} from "react-icons/io5";
import { useRouter } from "next/router";

const Navbar: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const router = useRouter();

  return (
    <MantineNavbar
      p="xs"
      width={{ sm: 250 }}
      hiddenBreakpoint="md"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        <Stack>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              backgroundColor:
                router.pathname == "/" ? theme.colors.gray[0] : "transparent",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              borderRadius: theme.radius.md,
            })}
            py="sm"
            px="xs"
          >
            <Group position="left">
              <ThemeIcon variant="light" color="cyan">
                <IoCalendarClear />
              </ThemeIcon>
              <Text>Horario</Text>
            </Group>
          </UnstyledButton>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              backgroundColor:
                router.pathname == "/notes"
                  ? theme.colors.gray[0]
                  : "transparent",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              borderRadius: theme.radius.md,
            })}
            py="sm"
            px="xs"
          >
            <Group position="left">
              <ThemeIcon variant="light" color="orange">
                <IoDocument />
              </ThemeIcon>
              <Text>Notas</Text>
            </Group>
          </UnstyledButton>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              backgroundColor:
                router.pathname == "/tasks"
                  ? theme.colors.gray[0]
                  : "transparent",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              borderRadius: theme.radius.md,
            })}
            py="sm"
            px="xs"
          >
            <Group position="left">
              <ThemeIcon variant="light" color="blue">
                <IoCheckmarkCircle />
              </ThemeIcon>
              <Text>Tareas</Text>
            </Group>
          </UnstyledButton>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              backgroundColor:
                router.pathname == "/pomodoro"
                  ? theme.colors.gray[0]
                  : "transparent",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              borderRadius: theme.radius.md,
            })}
            py="sm"
            px="xs"
          >
            <Group position="left">
              <ThemeIcon variant="light" color="yellow">
                <IoTime />
              </ThemeIcon>
              <Text>Pomodoro</Text>
            </Group>
          </UnstyledButton>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              backgroundColor:
                router.pathname == "/settings"
                  ? theme.colors.gray[0]
                  : "transparent",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              borderRadius: theme.radius.md,
            })}
            py="sm"
            px="xs"
          >
            <Group position="left">
              <ThemeIcon variant="light" color="gray">
                <IoSettings />
              </ThemeIcon>
              <Text>Configuración</Text>
            </Group>
          </UnstyledButton>
        </Stack>
      </MantineNavbar.Section>

      <MantineNavbar.Section>{/* user content here */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
