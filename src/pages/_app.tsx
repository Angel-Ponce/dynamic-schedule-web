import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import { Provider } from "react-redux";
import { defaultStore } from "$stores";
import { useUserTheme } from "$hooks";
import { LoadGeneralData, ProtectedLayout } from "$templates";

import "../../styles/globals.css";

export default function App(props: AppProps) {
  const [userTheme, toggleColorScheme] = useUserTheme();

  const { Component, pageProps } = props;

  return (
    <Provider store={defaultStore}>
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
          <Notifications />
          <ProtectedLayout>
            <LoadGeneralData>
              <Component {...pageProps} />
            </LoadGeneralData>
          </ProtectedLayout>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}
