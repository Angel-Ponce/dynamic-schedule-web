import React from "react";
import { Group, Navbar as MantineNavbar, Text, ThemeIcon } from "@mantine/core";
import { CalendarClear } from "react-ionicons";

const Navbar: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  return (
    <MantineNavbar
      px="xl"
      py="xl"
      width={{ md: 250 }}
      hiddenBreakpoint="md"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        {/* scrollable content here */}
      </MantineNavbar.Section>

      <MantineNavbar.Section>{/* Footer with user */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
