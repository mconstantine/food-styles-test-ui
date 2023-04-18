import { useRecoilValue } from "recoil";
import { Todo } from "./Todo";
import "./TodoList.css";
import { appState } from "../state";
import { ErrorBanner } from "./ErrorBanner";

export function TodoList() {
  const state = useRecoilValue(appState);

  switch (state.type) {
    case "anonymous":
      return null;
    case "logged_in":
      switch (state.todoList.status) {
        case "success":
          return (
            <div className="TodoList" role="list">
              {state.todoList.todos.map((todo) => (
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
}
