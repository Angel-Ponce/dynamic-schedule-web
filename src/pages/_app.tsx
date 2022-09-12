import { AppProps } from "next/app";
import Head from "next/head";
import { type ColorScheme, MantineProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { getUser } from "$helpers";

export default function App(props: AppProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loadingPath, setLoadingPath] = useState(false);
  const [userTheme, setUserTheme] = useLocalStorage<ColorScheme>({
    key: "userTheme",
    defaultValue: "light",
  });

  useEffect(() => {
    const redirect = async () => {
      router.events.on("routeChangeComplete", () => {
        setLoadingPath(false);
      });

      let [, exists, logedIn] = getUser();
      if (router.pathname == "/login" || router.pathname == "/register") {
        if (exists && logedIn) {
          setLoadingPath(true);
          await router.push("/");
        }
        setMounted(true);
        return;
      }

      if (!exists || !logedIn) {
        setLoadingPath(true);
        await router.push("/login");
      }
      setMounted(true);
    };

    redirect();
  }, [router, setMounted, setLoadingPath]);

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
          {!mounted || loadingPath ? <></> : <Component {...pageProps} />}
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
