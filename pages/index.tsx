import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar } from "$organisms";
import { useState } from "react";

const Index: NextPage = () => {
  let [hidden, setHidden] = useState(true);

  return (
    <AppShell padding="xl" navbar={<Navbar hidden={hidden} />}>
      Schedule go here
    </AppShell>
  );
};

export default Index;
