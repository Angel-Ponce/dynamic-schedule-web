import { AppShell, Grid, Box, Text, Stack, Group, Center } from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";

const columns = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

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
            <Box sx={{ width: "100%", border: "1px solid lightgray" }} py="xs">
              <Text align="center">Hora</Text>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, overflowX: "auto" }}>
            <Grid columns={7} gutter={0} sx={{ flexWrap: "nowrap" }}>
              {columns.map((col) => {
                return (
                  <Grid.Col
                    key={`column-${col}`}
                    span={1}
                    sx={{ minWidth: "130px" }}
                  >
                    <Box
                      py="xs"
                      sx={{ width: "100%", border: "1px solid lightgray" }}
                    >
                      <Text align="center">{col}</Text>
                    </Box>
                  </Grid.Col>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Center>
    </AppShell>
  );
};

export default Index;
