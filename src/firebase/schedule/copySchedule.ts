import { db } from "$app/firebase/config";
import { Schedule } from "$types";
import to from "await-to-ts";
import { doc, DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const copySchedule = async (
  actualUserUid: string,
  externalUserUid: string,
  externalScheduleUid: string
) => {
  const scheduleRef = doc(
    db,
    `users/${externalUserUid || "id"}/schedules`,
    externalScheduleUid || "id"
  ) as DocumentReference<Schedule>;

  const [e1, schedule] = await to(getDoc(scheduleRef));

  if (e1) return null;

  const uid = uuidv4();

  const [e2] = await to(
    setDoc(doc(db, `users/${actualUserUid || ""}/schedules`, uid), {
      ...schedule.data(),
      uid,
      name: `${schedule?.data()?.name} - copia`,
      userUid: actualUserUid,
    })
  );

  if (e2) return null;

  return {
    ...schedule.data(),
    uid,
    name: `${schedule?.data()?.name} - copia`,
    userUid: actualUserUid,
  };
};

export { copySchedule };
