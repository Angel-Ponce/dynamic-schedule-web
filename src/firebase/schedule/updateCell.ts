import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import type { Schedule } from "$types";

interface InputValues {
  time?: [Date | null, Date | null];
  title?: string;
  professor?: string;
  href?: string;
  bgColor?: string;
  textColor?: string;
}

const updateCell = async (
  schedule: Schedule,
  rowUid: string,
  cellUid: string,
  params: InputValues
) => {
  const scheduleDoc = doc(
    db,
    `users/${schedule.userUid}/schedules`,
    schedule.uid
  );

  let rows = [...schedule.rows];
  let row = rows.find((r) => r.uid == rowUid);
  row = row ? { ...row } : undefined;

  if (row) {
    row.cells = row.cells.map((c) =>
      c.uid == cellUid
        ? {
            ...c,
            time: params.time
              ? [
                  params.time[0] ? params.time[0].getTime() : null,
                  params.time[1] ? params.time[1].getTime() : null,
                ]
              : null,
            title: params.title || null,
            professor: params.professor || null,
            href: params.href || null,
            bgColor: params.bgColor || null,
            textColor: params.textColor || null,
          }
        : c
    );

    rows = rows.map((r) => (r.uid == row?.uid ? row : r));

    await updateDoc(scheduleDoc, {
      rows,
    });
  }
};

export { updateCell };
