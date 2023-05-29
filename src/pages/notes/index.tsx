import { AppShell, Box } from "@mantine/core";
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
      <Box className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 3xl:columns-6">
        {loading ||
          (error && (
            <>
              {new Array(20).fill({}).map((_n, i) => (
                <Note key={i} loading></Note>
              ))}
            </>
          ))}

        {!error && !loading && (
          <>
            {notes?.map((note) => (
              <Note key={note.uid} note={note}></Note>
            ))}
          </>
        )}
      </Box>
    </AppShell>
  );
};

export default Notes;
