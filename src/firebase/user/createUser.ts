import type { UserAccount } from "$types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "$app/firebase/config";
import { v4 as uuidv4 } from "uuid";

const createUser = async (user: UserAccount) => {
  let userUid = user.uid;

  await setDoc(doc(db, "users", userUid), {
    name: user.name,
    email: user.email,
    uid: userUid,
    photoURL: user.photoURL,
  });

  let scheduleUid = uuidv4();

  await setDoc(doc(db, `users/${userUid}/schedules`, scheduleUid), {
    uid: scheduleUid,
    name: "Principal",
    hiddeSaturday: false,
    hiddeSunday: false,
    hiddeWeek: false,
    showGrid: false,
    fontFamily: "default",
    sendNotifications: false,
    sendEmailNotifications: false,
    language: "es",
    rows: [],
    userUid: userUid,
  });

  let notesUid = uuidv4();

  await setDoc(doc(db, `users/${userUid}/notes`, notesUid), {
    uid: notesUid,
  });

  let todosUid = uuidv4();

  await setDoc(doc(db, `users/${userUid}/todos`, todosUid), {
    uid: todosUid,
  });
};

export { createUser };
