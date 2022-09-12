import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { getUser } from "$helpers";
import { useUserTheme } from "$hooks";

export default function App(props: AppProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loadingPath, setLoadingPath] = useState(false);
  const [userTheme, toggleColorScheme] = useUserTheme();

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
    <ColorSchemeProvider
      colorScheme={userTheme}
      toggleColorScheme={toggleColorScheme}
    >
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
    </ColorSchemeProvider>
  );
}
