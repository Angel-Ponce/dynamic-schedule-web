import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { auth } from "$app/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useState } from "react";

export default function App(props: AppProps) {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [loadingPath, setLoadingPath] = useState(true);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setLoadingPath(false);
    });

    if (router.pathname == "/login" || router.pathname == "/register") {
      if (user && !loading) router.push("/");
      return;
    }

    if (!user && !loading) router.push("/login");
  }, [router, user, loading, setLoadingPath]);

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
          colorScheme: "light",
        }}
      >
        {loading || loadingPath ? <></> : <Component {...pageProps} />}
      </MantineProvider>
    </>
  );
}
