import { useRecoilValue } from "recoil";
import { appState } from "../state";
import { lazy } from "react";

const TodoList = lazy(() => import("./TodoList"));
const SignUp = lazy(() => import("./SignUp"));
const Login = lazy(() => import("./Login"));

export function Router() {
  const state = useRecoilValue(appState);

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
}
