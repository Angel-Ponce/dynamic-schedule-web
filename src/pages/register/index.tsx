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
} from "@mantine/core";
import { GoogleSvg, GithubSvg } from "$svg";
import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useRegister } from "$hooks";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: NextPage = (props: PaperProps) => {
  const [register, error, errorMessage, loading] = useRegister();

  const form = useForm<RegisterForm>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      name: (val) => (val.trim().length > 0 ? null : "Este campo es requerido"),
      email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : "Correo inválido"),
      password: (val) =>
        val.length >= 8
          ? null
          : "La contraseña debe poseer 8 carácteres como mínimo",
    },
  });

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
  }, [error, errorMessage]);

  const onSubmit = async (values: RegisterForm) => {
    await register("emailAndPassword", {
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Center sx={{ width: "100vw", height: "100vh" }}>
      <Paper p={48} shadow="xl">
        <Text size="lg" weight={500} align="center">
          Registrate
        </Text>
        <Group my="md" position="center">
          <Button
            leftIcon={<GoogleSvg width={20} height={20} />}
            variant="light"
            radius="xl"
            size="xs"
            onClick={() => {
              register("google");
            }}
          >
            Google
          </Button>
          <Button
            leftIcon={<GithubSvg width={20} height={20} />}
            variant="light"
            radius="xl"
            size="xs"
            onClick={() => {
              register("github");
            }}
          >
            Github
          </Button>
        </Group>
        <Divider
          label="O continua con tu correo"
          labelPosition="center"
          my="lg"
        />
        <form onSubmit={form.onSubmit(onSubmit)} noValidate>
          <Stack>
            <TextInput
              required
              label="Nombre"
              placeholder="Joe Dae"
              {...form.getInputProps("name")}
              disabled={loading}
            />

            <TextInput
              required
              label="Correo"
              placeholder="correo@gmail.com"
              {...form.getInputProps("email")}
              disabled={loading}
            />

            <PasswordInput
              required
              label="Contraseña"
              {...form.getInputProps("password")}
              disabled={loading}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Group spacing={4}>
              <Text size="xs">Ya tienes una cuenta?</Text>
              <Link passHref href="/login">
                <Anchor component="a" color="blye" size="xs">
                  Inicia sesión
                </Anchor>
              </Link>
            </Group>
            <Button type="submit" loading={loading}>
              Adelante
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Register;
