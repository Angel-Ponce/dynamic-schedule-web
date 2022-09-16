import React from "react";
import {
  Drawer,
  Checkbox,
  Stack,
  Select,
  Button,
  Group,
  Tooltip,
  Box,
} from "@mantine/core";
import { IoLanguageOutline, IoHelpCircle } from "react-icons/io5";

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
        <Checkbox id="hiddeSaturday" label="Ocultar día Sábado" />
        <Checkbox id="hiddeSunday" label="Ocultar día Domingo" />
        <Checkbox id="hiddeWeek" label="Ocultar Lunes a Viernes" />
        <Group align="center" spacing={4}>
          <Checkbox id="sendNotifications" label="Notificaciones push" />
          <Tooltip
            label="Envía una alerta cuando un curso se aproxima"
            position="top"
            withArrow
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IoHelpCircle width={18} height={18} />
            </Box>
          </Tooltip>
        </Group>
        <Group align="center" spacing={4}>
          <Checkbox
            id="sendEmailNotifications"
            label="Notificaciones por correo"
            disabled
          />
          <Tooltip
            label="Envía un correo cuando un curso se aproxima"
            position="top"
            withArrow
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IoHelpCircle width={18} height={18} />
            </Box>
          </Tooltip>
        </Group>
        <Group position="right">
          <Button sx={{ width: "fit-content" }}>Guardar</Button>
        </Group>
      </Stack>
    </Drawer>
  );
};

export default Settings;
