import { apiUrl } from "../constants/apiUrl";
import { Todo } from "../state";

export enum ListTodosFilter {
  All = "all",
  Completed = "completed",
  Incompleted = "uncompleted",
}

export function listTodos(filter: ListTodosFilter): Promise<Todo[]> {
  return window
    .fetch(`${apiUrl}/todos/?filter=${filter}`)
    .then((response) => response.json());
}
