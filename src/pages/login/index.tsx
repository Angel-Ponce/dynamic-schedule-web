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
import { useState } from "react";
import wait from "wait";
import { auth } from "$app/firebase";
import {
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";

interface LoginForm {
  email: string;
  password: string;
}

const Login: NextPage = (props: PaperProps) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  const form = useForm<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S\.\S+$/.test(val) ? null : "Correo inválido"),
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    await wait(3000);
    setLoading(false);
  };

  return (
    <Center sx={{ width: "100vw", height: "100vh" }}>
      <Paper p={48} shadow="xl">
        <Text size="lg" weight={500} align="center">
          Inicia Sesión
        </Text>
        <Group my="md" position="center">
          <Button
            leftIcon={<GoogleSvg width={20} height={20} />}
            variant="light"
            radius="xl"
            size="xs"
            onClick={() => {
              signInWithGoogle();
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
              signInWithGithub();
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
              <Text size="xs">No tienes una cuenta aún?</Text>
              <Link passHref href="/register">
                <Anchor component="a" color="blye" size="xs">
                  Registrate
                </Anchor>
              </Link>
            </Group>
            <Button type="submit" loading={loading}>
              Iniciar
            </Button>
          </Group>
        </form>
      </Paper>
    </Center>
  );
};

export default Login;
