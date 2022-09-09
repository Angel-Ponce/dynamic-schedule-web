import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  type DefaultMantineColor,
} from "@mantine/core";
import React, { ReactNode } from "react";
import Link from "next/link";

const NavbarLink: React.FC<{
  pathname: string;
  redirectTo: string;
  title: string;
  color: DefaultMantineColor;
  icon: ReactNode;
}> = ({ pathname, redirectTo, title, color, icon }) => {
  return (
    <Link passHref href={redirectTo}>
      <UnstyledButton
        sx={(theme) => ({
          width: "100%",
          backgroundColor:
            pathname == redirectTo ? theme.colors.gray[0] : "transparent",
          "&:hover": {
            backgroundColor: theme.colors.gray[1],
          },
          borderRadius: theme.radius.md,
        })}
        py="sm"
        px="xs"
        component="a"
      >
        <Group position="left">
          <ThemeIcon variant="light" color={color}>
            {icon}
          </ThemeIcon>
          <Text>{title}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

export default NavbarLink;
