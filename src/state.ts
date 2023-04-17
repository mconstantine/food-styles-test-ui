import { RecoilState, atom } from "recoil";
import { ListTodosFilter, listTodos } from "./utils/listTodos";

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

export const todoListState: RecoilState<Todo[]> = atom({
  key: "todoListState",
  default: [] as Todo[],
  effects: [
    ({ setSelf }) => {
      setSelf(listTodos(ListTodosFilter.All));
    },
  ],
});
