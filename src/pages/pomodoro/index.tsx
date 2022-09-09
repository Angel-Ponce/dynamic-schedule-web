import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";

const Pomodoro: NextPage = () => {
  let [hidden, setHidden] = useState(true);

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      Pomodoro go here
    </AppShell>
  );
};

export default Pomodoro;
