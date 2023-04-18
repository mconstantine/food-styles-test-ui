import { useRecoilValue } from "recoil";
import "./App.css";
import { appState } from "./state";
import { lazy } from "react";

const TodoList = lazy(() => import("./pages/TodoList"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const state = useRecoilValue(appState);

  const currentPage = (() => {
    switch (state.type) {
      case "logged_in":
        return <TodoList />;
      case "anonymous":
        switch (state.activity) {
          case "signup":
            return <SignUp />;
          case "login":
            return <Login />;
        }
    }
  })();

  return (
    <div className="App">
      <div className="card">
        <img src="todo-list.svg" alt="Todo List" />
        {currentPage}
      </div>
    </div>
  );
}

export default App;
