import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { auth } from "$app/firebase";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

type LoginType = "google" | "github" | "emailAndPassword";
type LoginParams = { email: string; password: string };

const useLogin = (): [
  { (type: LoginType, params?: LoginParams): Promise<void> },
  boolean,
  string
] => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [loginWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [loginWithEmailAndPassword, , , loginError] =
    useSignInWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);
  const [, setValidUser] = useLocalStorage<boolean>({
    key: "validUser",
  });

  let login = async (type: LoginType, params?: LoginParams) => {
    if (type == "google") {
      await loginWithGoogle();
      return;
    }

    if (type == "github") {
      await loginWithGithub();
      return;
    }

    await loginWithEmailAndPassword(
      params?.email || "",
      params?.password || ""
    );
  };

  useEffect(() => {
    if (googleError) {
      setErrorMessage(
        "Un error ha ocurrido al iniciar sesión con tu cuenta de Google"
      );
    }

    if (githubError) {
      setErrorMessage(
        "Un error ha ocurrido al iniciar sesión con tu cuenta de Github"
      );
    }

    if (loginError) {
      setErrorMessage(
        "Tus credenciales no son correctas o no existen en nuestros registros"
      );
    }

    setError(googleError || githubError || loginError ? true : false);
  }, [googleError, githubError, loginError]);

  useEffect(() => {
    setValidUser(firebaseUser ? true : false);
  }, [firebaseUser, setValidUser]);

  return [login, error, errorMessage];
};

export { useLogin };
