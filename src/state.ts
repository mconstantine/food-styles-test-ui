import { atom, selector } from "recoil";
import { ListTodosFilter, listTodos } from "./utils/listTodos";

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
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
  authTokens: AuthTokens;
  todoList: TodoListState;
}

type AppState = AnonymousUserState | LoggedInUserState;

export const appState = atom<AppState>({
  key: "AppState",
  default: {
    type: "anonymous",
    activity: "login",
  },
  effects: [
    ({ onSet, setSelf }) => {
      const authTokensStorageItem = window.localStorage.getItem(
        "todolist_authTokens"
      );

      if (authTokensStorageItem) {
        try {
          const authTokens = JSON.parse(authTokensStorageItem);

          listTodos(ListTodosFilter.All, authTokens).then((todos) =>
            setSelf({
              type: "logged_in",
              authTokens,
              todoList: {
                status: "success",
                todos,
              },
            })
          );
        } catch (_) {
          // Weirdly formatted storage item: do nothing
        }
      }

      onSet((state) => {
        switch (state.type) {
          case "anonymous":
            return;
          case "logged_in":
            window.localStorage.setItem(
              "todolist_authTokens",
              JSON.stringify(state.authTokens)
            );
        }
      });
    },
  ],
});

export const authTokensState = selector({
  key: "AuthTokens",
  get: ({ get }) => {
    const state = get(appState);

    switch (state.type) {
      case "anonymous":
        return undefined;
      case "logged_in":
        return state.authTokens;
    }
  },
});
