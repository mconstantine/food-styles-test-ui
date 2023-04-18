import { CreateTodoForm } from "../components/CreateTodoForm";
import { TodoList as TodoListComponent } from "../components/TodoList";
import { Filters } from "../components/Filters";

export default function TodoList() {
  return (
    <>
      <h1>Todo List</h1>
      <CreateTodoForm />
      <TodoListComponent />
      <Filters />
    </>
  );
}
