import { UserAccount } from "$types";
import { getUser } from "$helpers";
import { useEffect, useState } from "react";
const useUser = () => {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const [user] = getUser();

    setUser(user);
  }, [setUser]);

  return [user];
};

export { useUser };
