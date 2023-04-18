import { RecoilRoot } from "recoil";
import "./App.css";
import { Suspense } from "react";
import { Router } from "./pages/Router";

function App() {
  return (
    <Suspense fallback="Loading…">
      <RecoilRoot>
        <div className="App">
          <div className="card">
            <img src="todo-list.svg" alt="Todo List" />
            <Router />
          </div>
        </div>
      </RecoilRoot>
    </Suspense>
  );
}

export default App;
