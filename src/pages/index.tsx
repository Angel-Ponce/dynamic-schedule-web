import {
  AppShell,
  Divider,
  Group,
  Title,
  Text,
  ThemeIcon,
} from "@mantine/core";
import type { NextPage } from "next";
import { Navbar, Header } from "$organisms";
import { useState } from "react";
import { useAppSelector } from "$hooks";
import { IoCalendarClear } from "react-icons/io5";
import { useRouter } from "next/router";

const DynamicSchedule: NextPage = () => {
  let [hidden, setHidden] = useState(true);
  let user = useAppSelector((state) => state.user);
  let schedules = useAppSelector((state) => state.schedules);
  const router = useRouter();

  return (
    <AppShell
      padding="xl"
      navbar={<Navbar hidden={hidden} />}
      header={<Header setHiddenNavbar={setHidden} hiddenNavbar={hidden} />}
    >
      <Title order={3}>Bienvenido, {user.name || "User"}</Title>
      <Divider my="xl" />
      <Text>Tus horarios</Text>
      <Group spacing="sm">
        {schedules.map((schedule, i) => (
          <Group
            key={schedule.uid}
            spacing="sm"
            mt="xl"
            py={8}
            px={16}
            className="rounded-xl cursor-pointer transition-all flex-1 max-w-xs"
            sx={(theme) => ({
              "&:hover": {
                backgroundColor:
                  theme.colorScheme == "light"
                    ? theme.colors.gray[0]
                    : theme.colors.gray[8],
              },
            })}
            onClick={() => router.push(`/schedule/${schedule.uid}`)}
          >
            <ThemeIcon variant="light" size="xl" radius={999}>
              <IoCalendarClear />
            </ThemeIcon>
            <Text className="select-none">{schedule.name}</Text>
          </Group>
        ))}
      </Group>
    </AppShell>
  );
};

export default DynamicSchedule;
