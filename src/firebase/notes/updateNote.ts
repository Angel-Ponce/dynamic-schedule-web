import { db } from "$app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

interface UpdateNoteInput {
  uid: string;
  title: string;
  content: string;
  color: string;
  important: boolean;
}

const updateNote = async (input: UpdateNoteInput) => {
  const noteRef = doc(db, `notes/${input.uid}`);

  await updateDoc(noteRef, {
    title: input.title,
    content: input.content,
    color: input.color,
    important: input.important,
  });
};

export { updateNote };
