import {
  UnstyledButton,
  Group,
  Text,
  useMantineColorScheme,
  Collapse,
  Stack,
} from "@mantine/core";
import React, { useState } from "react";
import { IoArrowDown, IoArrowUp, IoCalendarClear } from "react-icons/io5";
import NavbarLink from "./NavbarLink";

const NavbarDropdown: React.FC<{
  pathname: string;
  title: string;
  links: { redirectTo: string; title: string }[];
}> = ({ pathname, title, links }) => {
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(true);

  return (
    <>
      <UnstyledButton
        sx={(theme) => ({
          width: "100%",
          backgroundColor: links.some((link) => link.redirectTo == pathname)
            ? colorScheme == "light"
              ? theme.colors.gray[0]
              : theme.colors.gray[8]
            : "transparent",
          borderRadius: theme.radius.md,
        })}
        py="sm"
        px="sm"
        onClick={() => setOpened((prev) => !prev)}
      >
        <Group position="apart">
          <Text>{title}</Text>
          {opened ? <IoArrowUp /> : <IoArrowDown />}
        </Group>
      </UnstyledButton>
      <Collapse in={opened} className="mt-2 ml-6">
        <Stack spacing={2}>
          {links.map((link, i) => (
            <NavbarLink
              key={i}
              pathname={pathname}
              redirectTo={link.redirectTo}
              title={link.title}
              color="blue"
              icon={<IoCalendarClear />}
            />
          ))}
        </Stack>
      </Collapse>
    </>
  );
};

export default NavbarDropdown;
