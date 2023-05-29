import { db } from "$app/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

const deleteNote = async (noteUid: string) => {
  const noteRef = doc(db, `notes/${noteUid}`);

  await deleteDoc(noteRef);
};

export { deleteNote };
