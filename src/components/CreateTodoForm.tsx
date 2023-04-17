import { FormEventHandler, useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { useCommand } from "../effects/useCommand";
import { useSetRecoilState } from "recoil";
import { Todo, todoListState } from "../state";

interface CreateTodoInput {
  title: string;
}

export function CreateTodoForm() {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const setTodoList = useSetRecoilState(todoListState);

  const [createTodoRequest, createTodo] = useCommand<CreateTodoInput, Todo>({
    path: "/todos/",
    method: "POST",
  });

  const onInputChange: FormEventHandler<HTMLInputElement> = (event) => {
    setNewTodoTitle(event.currentTarget.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    createTodo({ title: newTodoTitle });
  };

  const isInputDisabled = (() => {
    switch (createTodoRequest.status) {
      case "idle":
        return false;
      case "loading":
        return true;
      case "success":
        return false;
      case "failure":
        return true;
    }
  })();

  useEffect(() => {
    if (createTodoRequest.status === "success") {
      setTodoList((list) => [createTodoRequest.data, ...list]);
      setNewTodoTitle("");
    }
  }, [createTodoRequest]);

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        type="text"
        placeholder="Add a new todo"
        required
        value={newTodoTitle}
        onChange={onInputChange}
        disabled={isInputDisabled}
      />
    </form>
  );
}
