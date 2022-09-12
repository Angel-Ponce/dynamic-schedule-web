import { UserAccount } from "$types";

const getUser = (): [UserAccount | "undefined", boolean, boolean] => {
  const userRef = window.localStorage.getItem("user");
  const user = JSON.parse(JSON.stringify(userRef)) as UserAccount | "undefined";
  const exists = userRef != null;
  const logedIn = user != "undefined";

  return [user, exists, logedIn];
};

export { getUser };
