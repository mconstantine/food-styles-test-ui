import { RecoilRoot } from "recoil";
import "./App.css";
import { Filters } from "./components/Filters";
import { TodoList } from "./components/TodoList";
import { CreateTodoForm } from "./components/CreateTodoForm";
import { Suspense } from "react";

function App() {
  return (
    <div className="App">
      <div className="card">
        <img src="todo-list.svg" alt="Todo List" />
        <h1>Todo List</h1>
        <RecoilRoot>
          <CreateTodoForm />
          <Suspense fallback="Loading…">
            <TodoList />
          </Suspense>
          <Filters />
        </RecoilRoot>
      </div>
    </div>
  );
}

export default App;
