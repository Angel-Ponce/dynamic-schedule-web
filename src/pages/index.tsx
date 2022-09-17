import { AppShell, Grid, Box, Text, Stack, Group, Center } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";
import { RowCell } from "$atoms";
import { v4 as uuidv4 } from "uuid";
import { type RowCell as RowCellType } from "$types";
import { ScheduleRow } from "$molecules";

const rowUid = uuidv4();

const headers = [
  "Hora",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const columns: RowCellType[] = headers.map((header, index) => ({
  uid: uuidv4(),
  bgColor: "",
  href: "",
  order: index,
  professor: "",
  rowUid: rowUid,
  textColor: "",
  title: header,
  type: "header",
}));

const Index: NextPage = () => {
  let [hidden, setHidden] = useState(true);

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      <Center sx={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "1300px",
            display: "flex",
          }}
        >
          <Box sx={{ minWidth: "135px" }}>
            <RowCell row={columns[0]} />
          </Box>
          <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
            <ScheduleRow
              size={7}
              columns={columns.filter((_, index) => index != 0)}
            />
          </Box>
        </Box>
      </Center>
    </AppShell>
  );
};

export default Index;
