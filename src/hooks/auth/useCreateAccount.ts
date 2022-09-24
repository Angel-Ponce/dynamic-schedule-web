import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { db } from "$app/firebase";
import { UserAccount } from "$types";
import {
  collection,
  CollectionReference,
  query,
  where,
  doc,
  setDoc,
  limit,
  getDocs,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../useAppDispatch";
import { setUser } from "$slices/userSlice";

const useCreateAccount = (): [
  { (user: UserAccount): Promise<void> },
  boolean
] => {
  const [successfully, setSuccessfully] = useState(false);
  const disptach = useAppDispatch();

  const validate = async (user: UserAccount) => {
    const usersRef = collection(
      db,
      "users"
    ) as CollectionReference<UserAccount>;
    const usersQuery = query(usersRef, where("uid", "==", user.uid), limit(1));
    const users = await getDocs(usersQuery);

    if (users && users.size == 1) {
      setSuccessfully(true);

      disptach(
        setUser({
          uid: users.docs[0].data().uid,
          name: users.docs[0].data().name,
          email: users.docs[0].data().email,
          photoURL: users.docs[0].data().photoURL,
        })
      );
      return;
    }

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
      name: "Horario",
      hiddeSaturday: false,
      hiddeSunday: false,
      hiddeWeek: false,
      showGrid: false,
      sendNotifications: false,
      sendEmailNotifications: false,
      language: "es",
    });

    let notesUid = uuidv4();

    await setDoc(doc(db, `users/${userUid}/notes`, notesUid), {
      uid: notesUid,
    });

    let todosUid = uuidv4();

    await setDoc(doc(db, `users/${userUid}/todos`, todosUid), {
      uid: todosUid,
    });

    disptach(
      setUser({
        uid: userUid,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      })
    );

    setSuccessfully(true);
  };

  return [validate, successfully];
};

export { useCreateAccount };
