import { atom } from "recoil";

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

interface FailedTodoListState {
  status: "failure";
}

interface SuccessfulTodoListState {
  status: "success";
  todos: Todo[];
}

type TodoListState = FailedTodoListState | SuccessfulTodoListState;

interface AnonymousUserState {
  type: "anonymous";
  activity: "signup" | "login";
}

interface LoggedInUserState {
  type: "logged_in";
  access_token: string;
  refresh_token: string;
  todoList: TodoListState;
}

type AppState = AnonymousUserState | LoggedInUserState;

export const appState = atom<AppState>({
  key: "todoListState",
  default: {
    type: "anonymous",
    activity: "login",
  },
  // TODO: read local storage and set the access token here
  // effects: [
  //   ({ setSelf }) => {
  //     setSelf(
  //       listTodos(ListTodosFilter.All).then(
  //         (todos) => ({
  //           status: "success",
  //           todos,
  //         }),
  //         () => ({
  //           status: "failure",
  //         })
  //       )
  //     );
  //   },
  // ],
});
