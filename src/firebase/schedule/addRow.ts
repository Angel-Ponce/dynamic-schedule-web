import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import type { Schedule } from "$types";
import { v4 as uuidv4 } from "uuid";

const addRow = async (schedule: Schedule, indexFrom: number) => {
  let uid = uuidv4();
  let rows = [...schedule.rows];

  const scheduleDoc = doc(
    db,
    `users/${schedule.userUid || "id"}/schedules`,
    schedule.uid
  );

  rows.splice(indexFrom + 1, 0, {
    uid,
    order: indexFrom + 1,
    scheduleUid: schedule.uid,
    cells: new Array(8).fill({}).map((_, i) => ({
      uid: uuidv4(),
      title: i == 0 ? null : "",
      href: null,
      type: i == 0 ? "hour" : "course",
      bgColor: null,
      textColor: null,
      order: i,
      professor: i == 0 ? null : "",
      rowUid: uid,
      time: i == 0 ? [null, null] : null,
    })),
  });

  await updateDoc(scheduleDoc, {
    rows,
  });
};

export { addRow };
