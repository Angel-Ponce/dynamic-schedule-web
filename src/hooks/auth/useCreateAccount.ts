import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
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

const useCreateAccount = (): [
  { (user: UserAccount): Promise<void> },
  boolean
] => {
  const [successfully, setSuccessfulyy] = useState(false);
  const [, setUser] = useLocalStorage<undefined | UserAccount>({
    key: "user",
  });

  const validate = async (user: UserAccount) => {
    const usersRef = collection(
      db,
      "users"
    ) as CollectionReference<UserAccount>;
    const usersQuery = query(usersRef, where("uid", "==", user.uid), limit(1));
    const users = await getDocs(usersQuery);

    if (users && users.size == 1) {
      setSuccessfulyy(true);
      setUser({
        uid: users.docs[0].data().uid,
        name: users.docs[0].data().name,
        email: users.docs[0].data().email,
      });
      return;
    }

    let userUid = user.uid;

    await setDoc(doc(db, "users", userUid), {
      name: user.name,
      email: user.email,
      uid: userUid,
    });

    setUser({
      uid: user.name,
      name: user.email,
      email: userUid,
    });

    let scheduleUid = uuidv4();

    await setDoc(doc(db, `users/${userUid}/schedules`, scheduleUid), {
      uid: scheduleUid,
      name: "Horario",
      hiddeSaturday: false,
      hiddeSunday: false,
      hiddeWeek: false,
    });

    let notesUid = uuidv4();

    await setDoc(doc(db, `users/${userUid}/notes`, notesUid), {});

    let todosUuid = uuidv4();

    await setDoc(doc(db, `users/${userUid}/todos`, todosUuid), {});

    setSuccessfulyy(true);
  };

  return [validate, successfully];
};

export { useCreateAccount };
