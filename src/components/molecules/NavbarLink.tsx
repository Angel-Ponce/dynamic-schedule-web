import {
  UnstyledButton,
  Group,
  ThemeIcon,
  Text,
  type DefaultMantineColor,
} from "@mantine/core";
import React, { ReactNode } from "react";
import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";
import { ColorScheme } from "@mantine/core";

const NavbarLink: React.FC<{
  pathname: string;
  redirectTo: string;
  title: string;
  color: DefaultMantineColor;
  icon: ReactNode;
}> = ({ pathname, redirectTo, title, color, icon }) => {
  const [userTheme] = useLocalStorage<ColorScheme>({
    key: "userTheme",
    defaultValue: "light",
  });

  return (
    <Link passHref href={redirectTo}>
      <UnstyledButton
        sx={(theme) => ({
          width: "100%",
          backgroundColor:
            pathname == redirectTo
              ? userTheme == "light"
                ? theme.colors.gray[0]
                : theme.colors.gray[8]
              : "transparent",
          "&:hover": {
            backgroundColor:
              userTheme == "light"
                ? theme.colors.gray[1]
                : theme.colors.gray[9],
          },
          borderRadius: theme.radius.md,
        })}
        py="sm"
        px="sm"
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
