import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { auth } from "$app/firebase";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useCreateAccount } from "./useCreateAccount";
import { UserAccount } from "$types";

type LoginType = "google" | "github" | "emailAndPassword";
type LoginParams = { email: string; password: string };

const useLogin = (): [
  { (type: LoginType, params?: LoginParams): Promise<void> },
  boolean,
  string,
  boolean
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validate, userAccount, successfully] = useCreateAccount();
  const [loginWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [loginWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [loginWithEmailAndPassword, , , loginError] =
    useSignInWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);
  const [, setUser] = useLocalStorage<null | UserAccount>({
    key: "user",
  });

  let login = async (type: LoginType, params?: LoginParams) => {
    setLoading(true);
    if (type == "google") {
      await loginWithGoogle();
      setLoading(false);
      return;
    }

    if (type == "github") {
      await loginWithGithub();
      setLoading(false);
      return;
    }

    await loginWithEmailAndPassword(
      params?.email || "",
      params?.password || ""
    );

    setLoading(false);
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
    const validateAccount = async () => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      if (successfully) {
        setUser(userAccount);
        return;
      }

      await validate({
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
      });
    };

    validateAccount();
  }, [firebaseUser, setUser, validate, successfully, userAccount]);

  return [login, error, errorMessage, loading];
};

export { useLogin };
