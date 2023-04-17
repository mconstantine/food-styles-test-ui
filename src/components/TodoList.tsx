import { Todo } from "./Todo";
import "./TodoList.css";

export function TodoList() {
  return (
    <div className="TodoList" role="list">
      <Todo id={1} title="Something to be done" isDone={true} />
      <Todo id={2} title="Something to be done" isDone={false} />
      <Todo id={3} title="Something to be done" isDone={false} />
      <Todo id={4} title="Something to be done" isDone={false} />
    </div>
  );
}
