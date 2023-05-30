import { db } from "$app/firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAppSelector } from "./useAppSelector";
import {
  CollectionReference,
  collection,
  query,
  where,
} from "firebase/firestore";
import { Note } from "$types";

const useNotes = () => {
  const { uid: userUid } = useAppSelector((state) => state.user);

  const notesRef = collection(db, "notes") as CollectionReference<Note>;

  const notesQuery = query(notesRef, where("userUid", "==", userUid));

  return useCollectionData(notesQuery);
};

export { useNotes };
