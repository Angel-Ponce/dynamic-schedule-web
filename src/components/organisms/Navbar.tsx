import React from "react";
import { Navbar as MantineNavbar, Stack } from "@mantine/core";
import {
  IoCalendarClear,
  IoCheckmarkCircle,
  IoDocument,
  IoTime,
} from "react-icons/io5";
import { useRouter } from "next/router";
import { NavbarDropdown, NavbarLink, UserOptions } from "$molecules";
import { useAppSelector } from "$hooks";

const Navbar: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  const router = useRouter();
  let schedules = useAppSelector((state) => state.schedules);

  return (
    <MantineNavbar
      p="xs"
      width={{ sm: 250 }}
      hiddenBreakpoint="sm"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        <Stack spacing={2}>
          <NavbarDropdown
            title="Horarios"
            pathname={router.pathname}
            links={schedules.map((schedule) => ({
              title: schedule.name,
              redirectTo: `/schedule/${schedule.uid}`,
            }))}
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

      <MantineNavbar.Section>
        <UserOptions />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
