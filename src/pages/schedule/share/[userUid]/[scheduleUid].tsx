import { copySchedule } from "$app/firebase/schedule";
import { useAppSelector } from "$hooks";
import { GeneralLoader } from "$templates";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ShareSchedule: React.FC = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const load = async () => {
      let userUid = router.query.userUid as string;
      let scheduleUid = router.query.scheduleUid as string;

      const s = await copySchedule(user.uid, userUid, scheduleUid);

      if (s) {
        router.push(`/schedule/${s.uid || "id"}`);
      }
    };

    load();
  });

  return <GeneralLoader />;
};

export default ShareSchedule;
