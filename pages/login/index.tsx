import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Center,
  ActionIcon,
} from "@mantine/core";
import { GoogleSvg } from "$svg";
import type { NextPage } from "next";
import Link from "next/link";

const AuthenticationForm: NextPage = (props: PaperProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S\.\S+$/.test(val) ? null : "Correo inválido"),
    },
  });

  return (
    <Center style={{ width: "100vw", height: "100vh" }}>
      <Paper p={48} shadow="xl">
        <Text size="lg" weight={500} align="center">
          Inicia Sesión
        </Text>
        <Group my="md" position="center">
          <ActionIcon size="xl">
            <GoogleSvg width={20} height={20} />
          </ActionIcon>
        </Group>
        <Divider
          label="O continua con tu correo"
          labelPosition="center"
          my="lg"
        />
        <form onSubmit={form.onSubmit(() => {})} noValidate>
          <Stack>
            <TextInput
              required
              label="Correo"
              placeholder="correo@gmail.com"
              {...form.getInputProps("email")}
            />

            <PasswordInput
              required
              label="Contraseña"
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Group spacing={4}>
              <Text size="xs">No tienes una cuenta aún?</Text>
              <Link passHref href="/register">
                <Anchor component="a" color="blye" size="xs">
                  Registrate
                </Anchor>
              </Link>
            </Group>
            <Button type="submit">Iniciar</Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default AuthenticationForm;
