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
import { useCreateAccount } from "./useCreateAccount";
import { UserAccount } from "$types";

const useRegister = (): [
  { (type: RegisterType, params?: RegisterParams): Promise<void> },
  boolean,
  string,
  boolean
] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [validate, userAccount, successfully] = useCreateAccount();
  const [registerWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [registerWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [registerWithEmailAndPassword, , , registerError] =
    useCreateUserWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);
  const [, setUser] = useLocalStorage<null | UserAccount>({
    key: "user",
  });

  let register = async (type: RegisterType, params?: RegisterParams) => {
    setLoading(true);
    if (type == "google") {
      await registerWithGoogle();
      setLoading(false);
      return;
    }

    if (type == "github") {
      await registerWithGithub();
      setLoading(false);
      return;
    }

    setUserName(params?.name || "User");

    await registerWithEmailAndPassword(
      params?.email || "",
      params?.password || ""
    );

    setLoading(false);
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
        name: firebaseUser.displayName || userName,
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
      });
    };

    validateAccount();
  }, [firebaseUser, setUser, validate, successfully, userName, userAccount]);

  return [register, error, errorMessage, loading];
};

export { useRegister };
