import { to } from "await-to-ts";
import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

interface InputOptions {
  name: string;
  language: "es" | "en";
  hiddeSaturday: boolean;
  hiddeSunday: boolean;
  hiddeWeek: boolean;
  showGrid: boolean;
  sendEmailNotifications: boolean;
  sendNotifications: boolean;
  fontFamily: string;
}

const updateSchedule = async (
  userUid: string,
  scheduleUid: string,
  options: InputOptions
) => {
  const scheduleRef = doc(
    db,
    `users/${userUid || "id"}/schedules`,
    scheduleUid || "id"
  );

  const [e] = await to(
    updateDoc(scheduleRef, {
      ...options,
    })
  );

  if (e) return false;

  return true;
};

export { updateSchedule };
