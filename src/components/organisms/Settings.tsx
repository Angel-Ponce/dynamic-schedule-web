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
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import {
  IoLanguageOutline,
  IoHelpCircle,
  IoContrast,
  IoText,
} from "react-icons/io5";
import { useForm } from "@mantine/form";

const Settings: React.FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const form = useForm({
    initialValues: {
      fontFamily: "default",
    },
  });

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
      <Stack>
        <Select
          label="Idioma"
          data={[{ value: "es", label: "Español" }]}
          transition="slide-down"
          icon={<IoLanguageOutline />}
          value="es"
        />
        <Select
          label="Tipo de letra"
          data={[
            { value: "default", label: "Por defecto" },
            { value: "poppins", label: "Poppins" },
            { value: "abyssinicasil", label: "Abyssinica SIL" },
            { value: "ubuntu", label: "Ubuntu" },
            { value: "heebo", label: "Heebo" },
            { value: "lobster", label: "Lobster" },
            { value: "pacifico", label: "Pacifico" },
            { value: "shadowsintolight", label: "Shadows Into Light" },
            { value: "caveat", label: "Caveat" },
          ]}
          transition="slide-down"
          icon={<IoText />}
          {...form.getInputProps("fontFamily")}
        />
        <Text
          sx={{
            fontFamily:
              form.values.fontFamily == "default"
                ? undefined
                : form.values.fontFamily,
          }}
        >
          Ej. Tipo de fuente
        </Text>
        <Select
          label="Tema"
          data={[
            { value: "light", label: "Claro" },
            { value: "dark", label: "Oscuro" },
          ]}
          transition="slide-down"
          icon={<IoContrast />}
          value={colorScheme}
          onChange={(value) => {
            if (value == "dark" || value == "light") toggleColorScheme(value);
          }}
        />
        <Stack spacing="xl" mt="md">
          <Checkbox id="showGrid" label="Ver celdas" />
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
      </Stack>
    </Drawer>
  );
};

export default Settings;
