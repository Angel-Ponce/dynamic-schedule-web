import { useRouter } from "next/router";
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

type LoginType = "google" | "github" | "emailAndPassword";
type LoginParams = { email: string; password: string };

const useLogin = (): [
  { (type: LoginType, params?: LoginParams): Promise<void> },
  boolean,
  string,
  boolean
] => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [validate, successfully] = useCreateAccount();
  const [loginWithGoogle, , , googleError] = useSignInWithGoogle(auth);
  const [loginWithGithub, , , githubError] = useSignInWithGithub(auth);
  const [loginWithEmailAndPassword, , , loginError] =
    useSignInWithEmailAndPassword(auth);
  const [firebaseUser] = useAuthState(auth);

  let login = async (type: LoginType, params?: LoginParams) => {
    setLoading(true);
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
      setLoading(false);
    }

    if (githubError) {
      setErrorMessage(
        "Un error ha ocurrido al iniciar sesión con tu cuenta de Github"
      );
      setLoading(false);
    }

    if (loginError) {
      setErrorMessage(
        "Tus credenciales no son correctas o no existen en nuestros registros"
      );
      setLoading(false);
    }

    setError(googleError || githubError || loginError ? true : false);
  }, [googleError, githubError, loginError]);

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
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
        photoURL: firebaseUser.photoURL || "",
      });
    };

    validateAccount();
  }, [firebaseUser, validate, successfully, router]);

  return [login, error, errorMessage, loading];
};

export { useLogin };
