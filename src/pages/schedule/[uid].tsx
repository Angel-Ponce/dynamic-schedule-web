import {
  AppShell,
  ScrollArea,
  Center,
  Box,
  useMantineColorScheme,
  Group,
  Button,
  Popover,
  Text,
} from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useEffect, useState } from "react";
import { RowCell } from "$atoms";
import { v4 as uuidv4 } from "uuid";
import { type ScheduleRow as ScheduleRowType } from "$types";
import { ScheduleRow } from "$molecules";
import { useAppDispatch, useAppSelector } from "$hooks";
import { useRouter } from "next/router";
import {
  emptySchedule,
  resetSchedule,
  setSchedule,
} from "$slices/scheduleSlice";
import {
  IoCheckmarkCircle,
  IoShareSocialOutline,
  IoTrashOutline,
} from "react-icons/io5";

const rowUid = uuidv4();
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

const DynamicSchedule: NextPage = () => {
  let [hidden, setHidden] = useState(true);
  const { colorScheme } = useMantineColorScheme();
  let schedule = useAppSelector((state) => state.schedule);
  let schedules = useAppSelector((state) => state.schedules);
  let dispatch = useAppDispatch();
  let router = useRouter();

  useEffect(() => {
    let schedule = schedules.find(
      (schedule) => schedule.uid == router.query.uid
    );

    if (schedule) {
      dispatch(setSchedule(schedule));
      return;
    }

    dispatch(resetSchedule());
  });

  const handleShareSchedule = async () => {
    const url = `${location.origin}/schedule/share/${schedule.userUid}/${schedule.uid}`;
    await navigator.clipboard.writeText(url);
  };

  if (emptySchedule(schedule)) return <></>;

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
          <Group position="right" pb="md">
            <Popover position="left" transition="scale">
              <Popover.Target>
                <Box>
                  <Button
                    leftIcon={<IoShareSocialOutline />}
                    variant="light"
                    onClick={handleShareSchedule}
                  >
                    Compartir
                  </Button>
                </Box>
              </Popover.Target>
              <Popover.Dropdown p={3}>
                <Text color="green">
                  <Group spacing={3} align="center">
                    <IoCheckmarkCircle />
                    <Text>Se copió el enlace</Text>
                  </Group>
                </Text>
              </Popover.Dropdown>
            </Popover>
            {!schedule.uid.startsWith("main") && (
              <Button leftIcon={<IoTrashOutline />} variant="light" color="red">
                Eliminar
              </Button>
            )}
          </Group>
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
              <ScheduleRow index={-1} size={7} row={headerRow} />
            </Box>
          </Box>
          <ScrollArea.Autosize
            sx={{ minHeight: "40px" }}
            maxHeight="calc(100vh - 250px)"
          >
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
                {schedule.rows.map((row) => (
                  <RowCell key={`hours-${row.uid}`} cell={row.cells[0]} />
                ))}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                {/* Cell courses go here */}
                {schedule.rows.map((row, i) => (
                  <ScheduleRow
                    index={i}
                    key={`courses-${row.uid}`}
                    size={7}
                    row={row}
                  />
                ))}
              </Box>
            </Box>
          </ScrollArea.Autosize>
        </ScrollArea>
      </Center>
    </AppShell>
  );
};

export default DynamicSchedule;
