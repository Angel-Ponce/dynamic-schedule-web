import {
  UnstyledButton,
  Avatar,
  Stack,
  Text,
  Group,
  Popover,
  ThemeIcon,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { IoLogOut, IoMoon, IoSettings, IoSunny } from "react-icons/io5";
import { useLogout, useUser } from "$hooks";
import { getUserInitials } from "$helpers";

const UserOptions: React.FC = () => {
  const [user] = useUser();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [logout] = useLogout();

  return (
    <Stack spacing="xs">
      <Group position="right" spacing="xs">
        <ActionIcon
          variant="light"
          color={colorScheme == "light" ? "indigo" : "yellow"}
          onClick={() => {
            toggleColorScheme();
          }}
          size="lg"
        >
          {colorScheme == "light" ? <IoMoon /> : <IoSunny />}
        </ActionIcon>
        <ActionIcon variant="light" color="gray">
          <IoSettings></IoSettings>
        </ActionIcon>
      </Group>
      <Popover position="top" transition="slide-up" width="target">
        <Popover.Target>
          <UnstyledButton
            p="md"
            sx={(theme) => ({
              backgroundColor:
                colorScheme == "light"
                  ? theme.colors.gray[0]
                  : theme.colors.gray[8],
              ":hover": {
                backgroundColor:
                  colorScheme == "light"
                    ? theme.colors.gray[1]
                    : theme.colors.gray[9],
              },
            })}
          >
            <Group spacing="xs" position="center">
              <Avatar radius="xl" size="md" src={user?.photoURL}>
                {getUserInitials(user?.name || "User")}
              </Avatar>
              <Stack spacing={2}>
                <Text size="sm">{user?.name || "User name"}</Text>
                <Text size="xs" color="dimmed">
                  {user?.email || "email"}
                </Text>
              </Stack>
            </Group>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown p={0} color="blue">
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              "&:hover": {
                backgroundColor:
                  colorScheme == "light"
                    ? theme.colors.gray[1]
                    : theme.colors.gray[9],
              },
              padding: theme.spacing.sm,
            })}
            onClick={() => logout()}
          >
            <Group position="left">
              <ThemeIcon variant="light" color="red">
                <IoLogOut />
              </ThemeIcon>
              <Text>Cerrar Sesión</Text>
            </Group>
          </UnstyledButton>
        </Popover.Dropdown>
      </Popover>
    </Stack>
  );
};

export default UserOptions;
