import { TodoTask } from "./TodoTask";

interface Todo {
  uid: string;
  title: string;
  userUid: string;
  tasks: TodoTask[];
}

export type { Todo };
