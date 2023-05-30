import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  type DefaultMantineColor,
  useMantineColorScheme,
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
  const { colorScheme } = useMantineColorScheme();

  return (
    <Link href={redirectTo}>
      <UnstyledButton
        sx={(theme) => ({
          width: "100%",
          backgroundColor:
            pathname == redirectTo
              ? colorScheme == "light"
                ? theme.colors.gray[0]
                : theme.colors.gray[8]
              : "transparent",
          "&:hover": {
            backgroundColor:
              colorScheme == "light"
                ? theme.colors.gray[1]
                : theme.colors.gray[9],
          },
          borderRadius: theme.radius.md,
        })}
        py="sm"
        px="sm"
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
