import { RecoilState, atom } from "recoil";
import { ListTodosFilter, listTodos } from "./utils/listTodos";

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

export const todoListState: RecoilState<TodoListState> = atom<TodoListState>({
  key: "todoListState",
  default: {
    status: "success",
    todos: [],
  },
  effects: [
    ({ setSelf }) => {
      setSelf(
        listTodos(ListTodosFilter.All).then(
          (todos) => ({
            status: "success",
            todos,
          }),
          () => ({
            status: "failure",
          })
        )
      );
    },
  ],
});
