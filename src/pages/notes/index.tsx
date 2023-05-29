import { AppShell } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";
import { useNotes } from "$hooks";
import { Note } from "$molecules";

const Notes: NextPage = () => {
  let [hidden, setHidden] = useState(true);
  const [notes, loading, error] = useNotes();

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      {notes?.map((note) => (
        <Note key={note.uid} note={note}></Note>
      ))}
    </AppShell>
  );
};

export default Notes;
