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
import wait from "wait";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "$app/firebase";
import { showNotification } from "@mantine/notifications";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const Register: NextPage = (props: PaperProps) => {
  const [registerWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [registerWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [registerWithEmailAndPassword, , , registerError] =
    useCreateUserWithEmailAndPassword(auth);
  const [loading, setLoading] = useState(false);

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
    if (googleError) {
      showNotification({
        title: "Error",
        message: "Un error ha ocurrido al registrarse con tu cuenta de Google",
        color: "red",
      });
    }

    if (githubError) {
      showNotification({
        title: "Error",
        message: "Un error ha ocurrido al registrarse con tu cuenta de Github",
        color: "red",
      });
    }

    if (registerError) {
      showNotification({
        title: "Error",
        message: "Un error ha ocurrido al registrarse con correo y contraseña",
        color: "red",
      });
    }
  }, [googleError, githubError, registerError]);

  const onSubmit = async (values: RegisterForm) => {
    setLoading(true);
    await registerWithEmailAndPassword(values.email, values.password);
    setLoading(false);
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
              registerWithGoogle();
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
              registerWithGithub();
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
