import { db } from "$app/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface CreateNoteInput {
  userUid: string;
  title: string;
  color: string;
}

const createNote = async (input: CreateNoteInput) => {
  const noteUid = uuidv4();

  const noteRef = doc(db, "/notes", noteUid);

  await setDoc(noteRef, {
    uid: noteUid,
    ...input,
    content: "",
    important: false,
  });
};

export { createNote };
