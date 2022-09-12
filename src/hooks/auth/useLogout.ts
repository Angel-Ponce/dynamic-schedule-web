import { useRouter } from "next/router";
import { UserAccount } from "$types";
import { useLocalStorage } from "@mantine/hooks";
import { auth } from "$app/firebase";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../useAppDispatch";
import { resetUser } from "$slices/userSlice";

const useLogout = (): [{ (): Promise<void> }] => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    dispatch(resetUser());
    await router.push("/login");
  };

  return [logout];
};

export { useLogout };
