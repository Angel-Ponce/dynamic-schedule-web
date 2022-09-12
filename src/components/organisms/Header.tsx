import React, { Dispatch, SetStateAction } from "react";
import {
  Group,
  ThemeIcon,
  Text,
  Header as MantineHeader,
  Center,
  MediaQuery,
  Burger,
} from "@mantine/core";
import { IoCalendarClear } from "react-icons/io5";

const Header: React.FC<{
  setHiddenNavbar: Dispatch<SetStateAction<boolean>>;
  hiddenNavbar: boolean;
}> = ({ hiddenNavbar, setHiddenNavbar }) => {
  return (
    <MantineHeader height={60} px="xl">
      <Center inline sx={{ height: "100%", width: "100%" }}>
        <Group position="apart" sx={{ width: "100%" }}>
          <Group position="left">
            <ThemeIcon radius="xl" size="xl" variant="light" color="blue">
              <IoCalendarClear size="20px" color="#228BE6" />
            </ThemeIcon>
            <Text size="lg" weight={600}>
              Horario Dinámico
            </Text>
          </Group>
          <Group position="right">
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={!hiddenNavbar}
                onClick={() => setHiddenNavbar((hiddenNavbar) => !hiddenNavbar)}
                size={20}
              />
            </MediaQuery>
          </Group>
        </Group>
      </Center>
    </MantineHeader>
  );
};

export default Header;
