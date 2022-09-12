import { useRouter } from "next/router";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [validate, successfully] = useCreateAccount();
  const [registerWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [registerWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [registerWithEmailAndPassword, , , registerError] =
    useCreateUserWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);

  let register = async (type: RegisterType, params?: RegisterParams) => {
    setLoading(true);

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
      setLoading(false);
    }

    if (githubError) {
      setErrorMessage(
        "Un error ha ocurrido al registrarte con tu cuenta de Github"
      );
      setLoading(false);
    }

    if (registerError) {
      setErrorMessage(
        "Un error ha ocurrido al registrarse con correo y contraseña"
      );
      setLoading(false);
    }

    setError(googleError || githubError || registerError ? true : false);
  }, [googleError, githubError, registerError]);

  useEffect(() => {
    const validateAccount = async () => {
      if (!firebaseUser) {
        return;
      }

      if (successfully) {
        await router.push("/");
        setLoading(false);
        return;
      }

      await validate({
        name: firebaseUser.displayName || userName,
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
      });
    };

    validateAccount();
  }, [firebaseUser, validate, successfully, userName, router]);

  return [register, error, errorMessage, loading];
};

export { useRegister };
