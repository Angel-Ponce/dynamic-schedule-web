import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import type { Schedule } from "$types";

const deleteRow = async (schedule: Schedule, rowUid: string) => {
  let rows = [...schedule.rows];

  const scheduleDoc = doc(
    db,
    `users/${schedule.userUid || "id"}/schedules`,
    schedule.uid
  );

  rows = rows.filter((r) => r.uid != rowUid);

  await updateDoc(scheduleDoc, {
    rows,
  });
};

export { deleteRow };
