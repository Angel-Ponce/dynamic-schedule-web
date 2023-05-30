import { copySchedule } from "$app/firebase/schedule";
import { useAppSelector } from "$hooks";
import { GeneralLoader } from "$templates";
import { Button, Center, Group, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const ShareSchedule: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!loading) return;

      let userUid = router.query.userUid as string;
      let scheduleUid = router.query.scheduleUid as string;

      const s = await copySchedule(user.uid, userUid, scheduleUid);

      setLoading(false);

      setSuccess(s != null);
    };

    load();
  }, []);

  if (loading) return <GeneralLoader />;

  if (success)
    return (
      <Center className="w-screen h-screen">
        <Stack>
          <Group position="center">
            <IoCheckmarkCircle className="text-green-500" size={40} />
          </Group>
          <Title align="center" order={4}>
            Horario cargado con éxito
          </Title>
          <Group position="center">
            <Link href="/">
              <Button>Regresar a inicio</Button>
            </Link>
          </Group>
        </Stack>
      </Center>
    );

  return (
    <Center className="w-screen h-screen">
      <Stack>
        <Group position="center">
          <IoCloseCircle className="text-red-500" size={40} />
        </Group>
        <Title order={4}>Ups! algo ha salido mal</Title>
        <Link passHref href="/">
          <Button component="a">Regresar a inicio</Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default ShareSchedule;
