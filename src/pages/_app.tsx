import { AppProps } from "next/app";
import Head from "next/head";
import { type ColorScheme, MantineProvider } from "@mantine/core";
import { auth } from "$app/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

export default function App(props: AppProps) {
  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  const [loadingPath, setLoadingPath] = useState(false);
  const [userTheme, setUserTheme] = useLocalStorage<ColorScheme>({
    key: "userTheme",
    defaultValue: "light",
  });

  useEffect(() => {
    if (!userTheme) setUserTheme("light");
  }, [userTheme, setUserTheme]);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setLoadingPath(false);
    });

    if (router.pathname == "/login" || router.pathname == "/register") {
      if (user && !loadingUser) {
        setLoadingPath(true);
        router.push("/");
      }
      return;
    }

    if (!user && !loadingUser) {
      setLoadingPath(true);
      router.push("/login");
    }
  }, [router, user, loadingUser, setLoadingPath]);

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Dynamic Schedule</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: userTheme,
          loader: "dots",
        }}
      >
        <NotificationsProvider>
          {loadingUser || loadingPath ? <></> : <Component {...pageProps} />}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
