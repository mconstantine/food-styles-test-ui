import { ChangeEventHandler } from "react";
import "./Todo.css";
import deleteTodoButtonImage from "../assets/delete-todo-button.svg";

interface Props {
  id: number;
  title: string;
  isDone: boolean;
}

export function Todo(props: Props) {
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(`TODO: ${event.currentTarget.checked}`);
  };

  return (
    <div className="Todo" role="listitem">
      <div>
        <input
          id={`todo-${props.id}`}
          name={`todo-${props.id}`}
          type="checkbox"
          checked={props.isDone}
          onChange={onChange}
        />
        <label htmlFor={`todo-${props.id}`}>{props.title}</label>
      </div>
      <button className="delete-button">
        <img src={deleteTodoButtonImage} alt="Delete todo" />
      </button>
    </div>
  );
}
