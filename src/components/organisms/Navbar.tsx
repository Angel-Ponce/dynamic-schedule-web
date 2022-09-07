import React from "react";
import { Container, Group, Navbar as MantineNavbar } from "@mantine/core";

const Navbar: React.FC<{ hidden: boolean }> = ({ hidden }) => {
  return (
    <MantineNavbar
      p="xl"
      width={{ md: 250 }}
      hiddenBreakpoint="md"
      hidden={hidden}
    >
      <MantineNavbar.Section grow>
        {/* buttons content here */}
      </MantineNavbar.Section>

      <MantineNavbar.Section>{/* user content here */}</MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
