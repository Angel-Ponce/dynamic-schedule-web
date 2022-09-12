import { UserAccount } from "$types";

const getUser = (): [UserAccount | null, boolean, boolean] => {
  const userRef = window.localStorage.getItem("user");
  let user: UserAccount | null = null;

  if (userRef != null && userRef != "undefined") {
    user = JSON.parse(userRef);
  }

  const exists = userRef != null;
  const logedIn = userRef != "undefined";

  return [user, exists, logedIn];
};

export { getUser };
