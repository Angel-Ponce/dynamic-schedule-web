import React from "react";
import { Drawer, Checkbox, Stack, Select, Group, Text } from "@mantine/core";
import { IoLanguageOutline } from "react-icons/io5";

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
      <Stack spacing="xl">
        <Select
          label="Idioma"
          data={[{ value: "es", label: "Español" }]}
          transition="slide-down"
          icon={<IoLanguageOutline />}
          value="es"
        />

        <Group position="left" sx={{ cursor: "pointer" }}>
          <Checkbox id="hiddeSaturday" label="Ocultar día Sábado" />
        </Group>

        <Group position="left" sx={{ cursor: "pointer" }}>
          <Checkbox id="hiddeSunday" label="Ocultar día Domingo" />
        </Group>

        <Group position="left" sx={{ cursor: "pointer" }}>
          <Checkbox id="hiddeWeek" label="Ocultar Lunes a Viernes" />
        </Group>

        <Group position="left" sx={{ cursor: "pointer" }}>
          <Checkbox id="sendNotifications" label="Notificaciones push" />
        </Group>

        <Group position="left" sx={{ cursor: "pointer" }}>
          <Checkbox
            id="sendEmailNotifications"
            label="Notificaciones por correo"
            disabled
          />
        </Group>
      </Stack>
    </Drawer>
  );
};

export default Settings;
