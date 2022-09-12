import { AppProps } from "next/app";
import Head from "next/head";
import { type ColorScheme, MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { UserAccount } from "$types";

export default function App(props: AppProps) {
  const router = useRouter();
  const [user] = useLocalStorage<null | UserAccount>({
    key: "user",
    defaultValue: null,
  });
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
      if (user) {
        setLoadingPath(true);
        router.push("/");
      }
      return;
    }

    if (!user) {
      setLoadingPath(true);
      router.push("/login");
    }
  }, [router, user, setLoadingPath]);

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
          {loadingPath ? <></> : <Component {...pageProps} />}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
