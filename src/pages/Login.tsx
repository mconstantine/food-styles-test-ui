import { useSetRecoilState } from "recoil";
import { TextInput } from "../components/TextInput";
import { appState } from "../state";
import { FormEventHandler, MouseEventHandler } from "react";

export default function Login() {
  const setAppState = useSetRecoilState(appState);

  const onSignUpLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setAppState({
      type: "anonymous",
      activity: "signup",
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("TODO: try logging in");
  };

  return (
    <>
      <h1>Welcome back!</h1>
      <p>Log in to continue.</p>
      <form onSubmit={onSubmit}>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
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
