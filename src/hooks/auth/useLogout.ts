import { UserAccount } from "$types";
import { useLocalStorage } from "@mantine/hooks";
import { auth } from "$app/firebase";
import { signOut } from "firebase/auth";

const useLogout = (): [{ (): Promise<void> }] => {
  const [, setUser] = useLocalStorage<null | UserAccount>({ key: "user" });

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return [logout];
};

export { useLogout };
