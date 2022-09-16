import React from "react";
import { Drawer } from "@mantine/core";

const Settings: React.FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened }) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Configuración"
      padding="xl"
      size="lg"
      position="right"
      overlayBlur={4}
      overlayOpacity={0.5}
    >
      Configuration go here
    </Drawer>
  );
};

export default Settings;
