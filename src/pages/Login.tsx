import { useSetRecoilState } from "recoil";
import { TextInput } from "../components/TextInput";
import { AuthTokens, appState } from "../state";
import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useCommand } from "../effects/useCommand";
import { ListTodosFilter, listTodos } from "../utils/listTodos";

interface LoginInput {
  email: string;
  password: string;
}

export default function Login() {
  const setAppState = useSetRecoilState(appState);

  const [input, setInput] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [loginRequest, login] = useCommand<LoginInput, AuthTokens>({
    path: "/users/login/",
    method: "POST",
  });

  const onEmailChange: FormEventHandler<HTMLInputElement> = (event) => {
    const email = event.currentTarget.value;
    setInput((input) => ({ ...input, email }));
  };

  const onPasswordChange: FormEventHandler<HTMLInputElement> = (event) => {
    const password = event.currentTarget.value;
    setInput((input) => ({ ...input, password }));
  };

  const onSignUpLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setAppState({
      type: "anonymous",
      activity: "signup",
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    login(input);
  };

  useEffect(() => {
    if (loginRequest.status === "success") {
      listTodos(ListTodosFilter.All, loginRequest.data).then((todos) => {
        setAppState({
          type: "logged_in",
          authTokens: loginRequest.data,
          todoList: {
            status: "success",
            todos,
          },
        });
      });
    }
  }, [loginRequest]);

  return (
    <>
      <h1>Welcome back!</h1>
      <p>Log in to continue.</p>
      <form onSubmit={onSubmit}>
        <TextInput
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={onEmailChange}
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={onPasswordChange}
        />
        <p>
          <a href="#" onClick={onSignUpLinkClick}>
            Don’t have an account? Sign up.
          </a>
        </p>
        <input type="submit" value="Log In" />
      </form>
    </>
  );
}
