import {
  AppShell,
  ScrollArea,
  Center,
  Box,
  useMantineColorScheme,
} from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";
import { RowCell } from "$atoms";
import { v4 as uuidv4 } from "uuid";
import {
  type ScheduleRow as ScheduleRowType,
  type RowCell as RowCellType,
} from "$types";
import { ScheduleRow } from "$molecules";
import Chance from "chance";

const rowUid = uuidv4();
const chance = new Chance();
const scheduleUid = uuidv4();

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

const headerRow: ScheduleRowType = {
  uid: rowUid,
  order: -1,
  scheduleUid: scheduleUid,
  cells: headers.map((header, index) => ({
    uid: uuidv4(),
    bgColor: "",
    href: "",
    order: index,
    professor: "",
    rowUid: rowUid,
    textColor: "",
    title: header,
    type: "header",
    time: null,
  })),
};

const rows: ScheduleRowType[] = new Array(10).fill({}).map((_, i) => {
  let uid = uuidv4();
  return {
    uid: uid,
    order: i,
    scheduleUid: scheduleUid,
    cells: new Array(8).fill({}).map((_, i) => {
      return {
        uid: uuidv4(),
        title: i == 0 ? null : chance.string({ length: 4 }),
        // bgColor: chance.color({ format: "hex" }),
        // textColor: chance.color({ format: "hex" }),
        bgColor: null,
        textColor: null,
        order: i,
        href: "https://www.google.com",
        professor: chance.name(),
        rowUid: uid,
        type: i == 0 ? "hour" : "course",
        time: [chance.date(), chance.date()],
      };
    }),
  };
});

const Index: NextPage = () => {
  let [hidden, setHidden] = useState(true);
  const { colorScheme } = useMantineColorScheme();

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      <Center sx={{ width: "100%" }}>
        <ScrollArea
          sx={{
            width: "100%",
            maxWidth: "1300px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={(theme) => ({
              display: "flex",
              width: "100%",
              borderBottom: "3px solid",
              borderColor:
                colorScheme == "light"
                  ? theme.colors.gray[1]
                  : theme.colors.gray[9],
            })}
          >
            <Box
              sx={(theme) => ({
                minWidth: "135px",
                maxWidth: "135px",
                borderRight: "3px solid",
                borderColor:
                  colorScheme == "light"
                    ? theme.colors.gray[1]
                    : theme.colors.gray[9],
              })}
            >
              {/* Cell hour header */}
              <RowCell cell={headerRow.cells[0]} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              {/* Cell day headers */}
              <ScheduleRow size={7} row={headerRow} />
            </Box>
          </Box>
          <ScrollArea.Autosize maxHeight="calc(100vh - 250px)">
            <Box sx={{ display: "flex", width: "100%" }}>
              <Box
                sx={(theme) => ({
                  minWidth: "135px",
                  maxWidth: "135px",
                  borderRight: "3px solid",
                  borderColor:
                    colorScheme == "light"
                      ? theme.colors.gray[1]
                      : theme.colors.gray[9],
                })}
              >
                {/* Cell hours go here */}
                {rows.map((row) => (
                  <RowCell key={`hours-${row.uid}`} cell={row.cells[0]} />
                ))}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {/* Cell courses go here */}
                {rows.map((row) => (
                  <ScheduleRow key={`courses-${row.uid}`} size={7} row={row} />
                ))}
              </Box>
            </Box>
          </ScrollArea.Autosize>
        </ScrollArea>
      </Center>
    </AppShell>
  );
};

export default Index;
