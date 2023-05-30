import React, { useState } from "react";
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
  TextInput,
  ScrollArea,
} from "@mantine/core";
import {
  IoLanguageOutline,
  IoHelpCircle,
  IoContrast,
  IoText,
} from "react-icons/io5";
import { useForm } from "@mantine/form";
import { useAppSelector } from "$hooks";
import { updateSchedule } from "$app/firebase/schedule";

const Settings: React.FC<{
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, setOpened }) => {
  const [loading, setLoading] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const schedule = useAppSelector((state) => state.schedule);

  const form = useForm({
    initialValues: {
      name: schedule.name,
      language: schedule.language,
      hiddeSaturday: schedule.hiddeSaturday,
      hiddeSunday: schedule.hiddeSunday,
      hiddeWeek: schedule.hiddeWeek,
      showGrid: schedule.showGrid,
      sendEmailNotifications: schedule.sendEmailNotifications,
      sendNotifications: schedule.sendNotifications,
      fontFamily: schedule.fontFamily,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    const updated = await updateSchedule(
      schedule.userUid,
      schedule.uid,
      form.values
    );
    setLoading(false);
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Configuración"
      padding="xl"
      size="md"
      position="right"
      overlayProps={{ blur: 4, opacity: 0.5 }}
    >
      <ScrollArea.Autosize mah="calc(100vh - 100px)">
        <Stack>
          <TextInput
            label="Nombre"
            placeholder="Nombre de horario"
            {...form.getInputProps("name")}
          />
          <Select
            label="Idioma"
            data={[{ value: "es", label: "Español" }]}
            transitionProps={{ transition: "scale" }}
            icon={<IoLanguageOutline />}
            {...form.getInputProps("language")}
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
            transitionProps={{ transition: "scale" }}
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
            transitionProps={{ transition: "scale" }}
            icon={<IoContrast />}
            value={colorScheme}
            onChange={(value) => {
              if (value == "dark" || value == "light") toggleColorScheme(value);
            }}
          />
          <Stack spacing="xl" mt="md">
            <Checkbox
              id="showGrid"
              label="Ver celdas"
              checked={form.values.showGrid}
              onChange={(e) =>
                form.setFieldValue("showGrid", e.currentTarget.checked)
              }
            />
            <Checkbox
              id="hiddeSaturday"
              label="Ocultar día Sábado"
              checked={form.values.hiddeSaturday}
              onChange={(e) =>
                form.setFieldValue("hiddeSaturday", e.currentTarget.checked)
              }
            />
            <Checkbox
              id="hiddeSunday"
              label="Ocultar día Domingo"
              checked={form.values.hiddeSunday}
              onChange={(e) =>
                form.setFieldValue("hiddeSunday", e.currentTarget.checked)
              }
            />
            <Checkbox
              id="hiddeWeek"
              label="Ocultar Lunes a Viernes"
              checked={form.values.hiddeWeek}
              onChange={(e) =>
                form.setFieldValue("hiddeWeek", e.currentTarget.checked)
              }
            />
            <Group align="center" spacing={4}>
              <Checkbox
                id="sendNotifications"
                label="Notificaciones push"
                disabled
              />
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
              <Button
                loading={loading}
                onClick={handleSubmit}
                sx={{ width: "fit-content" }}
              >
                Guardar
              </Button>
            </Group>
          </Stack>
        </Stack>
      </ScrollArea.Autosize>
    </Drawer>
  );
};

export default Settings;
