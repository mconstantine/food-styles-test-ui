import { useRecoilValue } from "recoil";
import { Todo } from "./Todo";
import "./TodoList.css";
import { todoListState } from "../state";
import { ErrorBanner } from "./ErrorBanner";

export function TodoList() {
  const state = useRecoilValue(todoListState);

  switch (state.status) {
    case "success":
      return (
        <div className="TodoList" role="list">
          {state.todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              isDone={todo.isDone}
            />
          ))}
        </div>
      );
    case "failure":
      return <ErrorBanner />;
  }
}
