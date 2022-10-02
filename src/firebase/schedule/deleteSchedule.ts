import { to } from "await-to-ts";
import { db } from "$app/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

const deleteSchedule = async (userUid: string, scheduleUid: string) => {
  const scheduleRef = doc(
    db,
    `users/${userUid || "id"}/schedules`,
    scheduleUid || "id"
  );

  const [e] = await to(deleteDoc(scheduleRef));

  if (e) return false;

  return true;
};

export { deleteSchedule };
