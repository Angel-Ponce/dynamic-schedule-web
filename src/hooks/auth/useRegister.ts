export {};
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { auth } from "$app/firebase";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

type RegisterType = "google" | "github" | "emailAndPassword";
type RegisterParams = { name: string; email: string; password: string };

const useRegister = (): [
  { (type: RegisterType, params?: RegisterParams): Promise<void> },
  boolean,
  string
] => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [registerWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [registerWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [registerWithEmailAndPassword, , , registerError] =
    useCreateUserWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);
  const [, setValidUser] = useLocalStorage({
    key: "validUser",
    defaultValue: false,
  });

  let register = async (type: RegisterType, params?: RegisterParams) => {
    if (type == "google") {
      await registerWithGoogle();
      return;
    }

    if (type == "github") {
      await registerWithGithub();
      return;
    }

    setUserName(params?.name || "User");

    await registerWithEmailAndPassword(
      params?.email || "",
      params?.password || ""
    );
  };

  useEffect(() => {
    if (googleError) {
      setErrorMessage(
        "Un error ha ocurrido al registrarte con tu cuenta de Google"
      );
    }

    if (githubError) {
      setErrorMessage(
        "Un error ha ocurrido al registrarte con tu cuenta de Github"
      );
    }

    if (registerError) {
      setErrorMessage(
        "Un error ha ocurrido al registrarse con correo y contraseña"
      );
    }

    setError(googleError || githubError || registerError ? true : false);
  }, [googleError, githubError, registerError]);

  useEffect(() => {
    setValidUser(firebaseUser ? true : false);
  }, [firebaseUser, setValidUser]);

  return [register, error, errorMessage];
};

export { useRegister };
