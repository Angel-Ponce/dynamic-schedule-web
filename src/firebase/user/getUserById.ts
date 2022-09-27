import type { UserAccount } from "$types";
import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "$app/firebase/config";

const getUserById = async (uid: string) => {
  const usersRef = collection(db, "users") as CollectionReference<UserAccount>;
  const usersQuery = query(usersRef, where("uid", "==", uid), limit(1));
  const users = await getDocs(usersQuery);

  if (users && users.size == 1) {
    return users.docs[0].data();
  }

  return null;
};

export { getUserById };
