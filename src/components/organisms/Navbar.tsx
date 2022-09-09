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
import { NavbarLink } from "$molecules";

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
          <NavbarLink
            icon={<IoCalendarClear />}
            title="Horario"
            redirectTo="/"
            pathname={router.pathname}
            color="cyan"
          />
          <NavbarLink
            icon={<IoDocument />}
            title="Notas"
            redirectTo="/notes"
            pathname={router.pathname}
            color="orange"
          />
          <NavbarLink
            icon={<IoCheckmarkCircle />}
            title="Tareas"
            redirectTo="/todo"
            pathname={router.pathname}
            color="blue"
          />
          <NavbarLink
            icon={<IoTime />}
            title="Pomodoro"
            redirectTo="/pomodoro"
            pathname={router.pathname}
            color="yellow"
          />
        </Stack>
      </MantineNavbar.Section>

      <MantineNavbar.Section>{/* user content here */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
