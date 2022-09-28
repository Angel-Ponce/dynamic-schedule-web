import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import type { Schedule } from "$types";

interface InputValues {
  prevTitle: string | null;
  time: [Date | null, Date | null] | null;
  title: string | null;
  professor: string | null;
  href: string | null;
  bgColor: string | null;
  textColor: string | null;
  isRecursive: boolean | null;
}

const updateCell = async (
  schedule: Schedule,
  cellUid: string,
  params: InputValues
) => {
  const scheduleDoc = doc(
    db,
    `users/${schedule.userUid}/schedules`,
    schedule.uid
  );

  let rows = [...schedule.rows];

  rows = rows.map((r) => ({
    ...r,
    cells: r.cells.map((c) => {
      let rule1 = c.uid == cellUid;
      let rule2 =
        c.uid == cellUid ||
        (c.title &&
          c.title.trim() == params.prevTitle?.trim() &&
          c.type == "course");
      let ruleSelection = params.isRecursive ? rule2 : rule1;

      return ruleSelection
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
        : c;
    }),
  }));

  await updateDoc(scheduleDoc, {
    rows,
  });
};

export { updateCell };
