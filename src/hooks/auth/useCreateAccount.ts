import { useState } from "react";
import { UserAccount } from "$types";
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

    await createUser(user);

    disptach(setUser(user));

    setSuccessfully(true);
  };

  return [validate, successfully];
};

export { useCreateAccount };
