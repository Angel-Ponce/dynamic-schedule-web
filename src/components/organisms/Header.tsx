import React from "react";
import {
  Group,
  ThemeIcon,
  Text,
  Header as MantineHeader,
  Center,
} from "@mantine/core";
import { IoCalendarClear } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <MantineHeader height={60} px="xl">
      <Center inline sx={{ height: "100%" }}>
        <Group position="apart">
          <Group position="left">
            <ThemeIcon radius="xl" size="lg" variant="light" color="blue">
              <IoCalendarClear size="15px" color="#228BE6" />
            </ThemeIcon>
            <Text size="lg" weight={600}>
              Horario Dinámico
            </Text>
          </Group>
        </Group>
      </Center>
    </MantineHeader>
  );
};

export default Header;
