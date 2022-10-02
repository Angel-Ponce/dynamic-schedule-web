import { db } from "$app/firebase/config";
import { Schedule } from "$types";
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

  const schedule = await getDoc(scheduleRef);

  const uid = uuidv4();

  setDoc(doc(db, `users/${actualUserUid || ""}/schedules`, uid), {
    ...schedule.data(),
    uid,
    name: `${schedule?.data()?.name} - copia`,
  });

  return { ...schedule.data(), uid, name: `${schedule?.data()?.name} - copia` };
};

export { copySchedule };
