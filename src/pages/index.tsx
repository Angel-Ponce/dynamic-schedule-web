import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";

const DynamicSchedule: NextPage = () => {
  let [hidden, setHidden] = useState(true);

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      Bienvenido
    </AppShell>
  );
};

export default DynamicSchedule;
