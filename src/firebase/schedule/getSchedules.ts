import {
  collection,
  CollectionReference,
  getDocs,
  query,
} from "firebase/firestore";
import { db } from "$app/firebase/config";
import { Schedule } from "$types";

const getSchedules = async (userUid: string) => {
  const schedulesRef = collection(
    db,
    `users/${userUid}/schedules`
  ) as CollectionReference<Schedule>;
  const scheduleQuery = query(schedulesRef);
  const schedules = await getDocs(scheduleQuery);

  if (schedules.docs.length > 0) return schedules.docs[0].data();

  return null;
};

export { getSchedules };
