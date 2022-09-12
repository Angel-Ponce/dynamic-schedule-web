import { UserAccount } from "$types";
import { getUserFromLocalStorage } from "$helpers";
import { useEffect, useState } from "react";
const useUser = () => {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const [user] = getUserFromLocalStorage();

    setUser(user);
  }, [setUser]);

  return [user];
};

export { useUser };
