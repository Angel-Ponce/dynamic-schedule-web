import {
  UnstyledButton,
  Avatar,
  Stack,
  Text,
  Group,
  Popover,
  ThemeIcon,
  ActionIcon,
} from "@mantine/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "$app/firebase";
import React from "react";
import { IoLogOut, IoMoon, IoSettings } from "react-icons/io5";
import { signOut } from "firebase/auth";

const UserOptions: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Stack spacing="xs">
      <Group position="right" spacing="xs">
        <ActionIcon variant="light" color="indigo">
          <IoMoon></IoMoon>
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
              backgroundColor: theme.colors.gray[0],
              ":hover": {
                backgroundColor: theme.colors.gray[1],
              },
            })}
          >
            <Group spacing="xs" position="center">
              <Avatar radius="xl" size="md" src={user?.photoURL} />
              <Stack spacing={2}>
                <Text size="sm">{user?.displayName || "User name"}</Text>
                <Text size="xs" color="gray">
                  {user?.email || "email"}
                </Text>
              </Stack>
            </Group>
          </UnstyledButton>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <UnstyledButton
            sx={(theme) => ({
              width: "100%",
              "&:hover": {
                backgroundColor: theme.colors.gray[1],
              },
              padding: theme.spacing.sm,
            })}
            onClick={() => signOut(auth)}
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
