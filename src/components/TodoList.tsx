import { useRecoilValue } from "recoil";
import { Todo } from "./Todo";
import "./TodoList.css";
import { todoListState } from "../state";

export function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <div className="TodoList" role="list">
      {todoList.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isDone={todo.isDone}
        />
      ))}
    </div>
  );
}
