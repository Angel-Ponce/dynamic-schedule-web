import {
  AppShell,
  ScrollArea,
  Center,
  Box,
  Stack,
  Button,
  Group,
} from "@mantine/core";
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

const headerRow: RowCellType[] = headers.map((header, index) => ({
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
        <Stack spacing="xs">
          <Group>
            <Button variant="light" color="green">
              Agregar fila
            </Button>
          </Group>
          <ScrollArea
            sx={{
              width: "100%",
              maxWidth: "1300px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ minWidth: "135px" }}>
                {/* Cell hour header */}
                <RowCell cell={headerRow[0]} />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {/* Cell day headers */}
                <ScheduleRow size={7} row={headerRow} />
              </Box>
            </Box>
            <ScrollArea.Autosize maxHeight="calc(100vh - 250px)">
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ minWidth: "135px" }}>{/* Cell hour go here */}</Box>
                <Box sx={{ flexGrow: 1 }}>{/* Cell courses go here */}</Box>
              </Box>
            </ScrollArea.Autosize>
          </ScrollArea>
        </Stack>
      </Center>
    </AppShell>
  );
};

export default Index;
