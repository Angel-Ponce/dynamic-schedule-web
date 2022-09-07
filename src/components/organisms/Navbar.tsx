import React from "react";
import { Group, Navbar as MantineNavbar, Text, ThemeIcon } from "@mantine/core";
import { CalendarClear } from "react-ionicons";

const Navbar: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  return (
    <MantineNavbar width={{ md: 250 }} hiddenBreakpoint="md" hidden={hidden}>
      <MantineNavbar.Section mt="xs">
        <Group position="apart">
          <Group position="left">
            <ThemeIcon radius="xl" size="xl" variant="light">
              <CalendarClear width="20px" height="20px" />
            </ThemeIcon>
            <Text size="xl">Horario Dinámico</Text>
          </Group>
        </Group>
      </MantineNavbar.Section>

      <MantineNavbar.Section grow mx="-xs" px="xs">
        {/* scrollable content here */}
      </MantineNavbar.Section>

      <MantineNavbar.Section>{/* Footer with user */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
