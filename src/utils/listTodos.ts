import { apiUrl } from "../constants/apiUrl";
import { AuthTokens, Todo } from "../state";

export enum ListTodosFilter {
  All = "all",
  Completed = "completed",
  Incompleted = "uncompleted",
}

export function listTodos(
  filter: ListTodosFilter,
  authTokens: AuthTokens
): Promise<Todo[]> {
  return window
    .fetch(`${apiUrl}/todos/?filter=${filter}`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    })
    .then((response) => response.json());
}
