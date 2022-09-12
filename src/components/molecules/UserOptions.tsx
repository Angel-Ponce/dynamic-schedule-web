import {
  UnstyledButton,
  Avatar,
  Stack,
  Text,
  Group,
  Popover,
  ThemeIcon,
  ActionIcon,
  type ColorScheme,
} from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "$app/firebase";
import React from "react";
import { IoLogOut, IoMoon, IoSettings, IoSunny } from "react-icons/io5";
import { useLocalStorage } from "@mantine/hooks";
import { useLogout } from "$hooks";

const UserOptions: React.FC = () => {
  const [user] = useAuthState(auth);
  const [userTheme, setUserTheme] = useLocalStorage<ColorScheme>({
    key: "userTheme",
    defaultValue: "light",
  });
  const [logout] = useLogout();

  return (
    <Stack spacing="xs">
      <Group position="right" spacing="xs">
        <ActionIcon
          variant="light"
          color={userTheme == "light" ? "indigo" : "yellow"}
          onClick={() => {
            setUserTheme((theme) => {
              return theme == "dark" ? "light" : "dark";
            });
          }}
          size="lg"
        >
          {userTheme == "light" ? <IoMoon /> : <IoSunny />}
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
                userTheme == "light"
                  ? theme.colors.gray[0]
                  : theme.colors.gray[8],
              ":hover": {
                backgroundColor:
                  userTheme == "light"
                    ? theme.colors.gray[1]
                    : theme.colors.gray[9],
              },
            })}
          >
            <Group spacing="xs" position="center">
              <Avatar radius="xl" size="md" src={user?.photoURL} />
              <Stack spacing={2}>
                <Text size="sm">{user?.displayName || "User name"}</Text>
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
                  userTheme == "light"
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
