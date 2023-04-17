import "./App.css";
import { Filters } from "./components/Filters";
import { TextInput } from "./components/TextInput";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <div className="card">
        <img src="todo-list.svg" alt="Todo List" />
        <h1>Todo List</h1>
        <TextInput />
        <TodoList />
        <Filters />
      </div>
    </div>
  );
}

export default App;
