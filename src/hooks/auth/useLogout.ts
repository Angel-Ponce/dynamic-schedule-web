import { useRouter } from "next/router";
import { UserAccount } from "$types";
import { useLocalStorage } from "@mantine/hooks";
import { auth } from "$app/firebase";
import { signOut } from "firebase/auth";

const useLogout = (): [{ (): Promise<void> }] => {
  const [, setUser] = useLocalStorage<undefined | UserAccount>({ key: "user" });
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    setUser(undefined);
    await router.push("/login");
  };

  return [logout];
};

export { useLogout };
