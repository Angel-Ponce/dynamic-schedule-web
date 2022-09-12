import { useLocalStorage } from "@mantine/hooks";
import { auth } from "$app/firebase";
import { signOut } from "firebase/auth";

const useLogout = (): [{ (): Promise<void> }] => {
  const [, setValidUser] = useLocalStorage<boolean>({ key: "validUser" });

  const logout = async () => {
    await signOut(auth);
    setValidUser(false);
  };

  return [logout];
};

export { useLogout };
