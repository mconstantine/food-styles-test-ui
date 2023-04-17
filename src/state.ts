import { RecoilState, atom } from "recoil";
import { apiUrl } from "./constants/apiUrl";

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
      setSelf(
        window.fetch(`${apiUrl}/todos/`).then((response) => response.json())
      );
    },
  ],
});
