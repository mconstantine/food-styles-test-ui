import {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { TextInput } from "../components/TextInput";
import { useSetRecoilState } from "recoil";
import { AuthTokens, appState } from "../state";
import { useCommand } from "../effects/useCommand";

interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const setAppState = useSetRecoilState(appState);

  const [signUpRequest, signUp] = useCommand<SignUpInput, AuthTokens>({
    path: "/users/signup/",
    method: "POST",
  });

  const [input, setInput] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const onNameChange: FormEventHandler<HTMLInputElement> = (event) => {
    const name = event.currentTarget.value;
    setInput((input) => ({ ...input, name }));
  };

  const onEmailChange: FormEventHandler<HTMLInputElement> = (event) => {
    const email = event.currentTarget.value;
    setInput((input) => ({ ...input, email }));
  };

  const onPasswordChange: FormEventHandler<HTMLInputElement> = (event) => {
    const password = event.currentTarget.value;
    setInput((input) => ({ ...input, password }));
  };

  const onLoginLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setAppState({
      type: "anonymous",
      activity: "login",
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    signUp(input);
  };

  useEffect(() => {
    if (signUpRequest.status === "success") {
      setAppState({
        type: "logged_in",
        authTokens: signUpRequest.data,
        todoList: {
          status: "success",
          todos: [],
        },
      });
    }
  }, [signUpRequest]);

  return (
    <>
      <h1>Welcome!</h1>
      <p>Sign up to start using Simpledo today.</p>
      <form onSubmit={onSubmit}>
        <TextInput
          placeholder="Full Name"
          value={input.name}
          onChange={onNameChange}
          autoComplete="name"
        />
        <TextInput
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={onEmailChange}
          autoComplete="email"
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={input.password}
          onChange={onPasswordChange}
          autoComplete="off"
        />
        <p>
          <a href="#" onClick={onLoginLinkClick}>
            Do have an account? Sign in.
          </a>
        </p>
        <input type="submit" value="Sign Up" />
      </form>
    </>
  );
}
