import { useState } from "react";
import { db } from "$app/firebase/config";
import { UserAccount } from "$types";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../useAppDispatch";
import { setUser } from "$slices/userSlice";
import { createUser, getUserById } from "$app/firebase/user";

const useCreateAccount = (): [
  { (user: UserAccount): Promise<void> },
  boolean
] => {
  const [successfully, setSuccessfully] = useState(false);
  const disptach = useAppDispatch();

  const validate = async (user: UserAccount) => {
    const firebaseUser = await getUserById(user.uid);

    if (firebaseUser) {
      setSuccessfully(true);

      disptach(setUser(firebaseUser));
      return;
    }

    await createUser();

    disptach(setUser(user));

    setSuccessfully(true);
  };

  return [validate, successfully];
};

export { useCreateAccount };
