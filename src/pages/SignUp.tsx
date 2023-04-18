import { FormEventHandler, MouseEventHandler } from "react";
import { TextInput } from "../components/TextInput";
import { useSetRecoilState } from "recoil";
import { appState } from "../state";

export default function SignUp() {
  const setAppState = useSetRecoilState(appState);

  const onLoginLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    setAppState({
      type: "anonymous",
      activity: "login",
    });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("TODO: try to sign up");
  };

  return (
    <>
      <h1>Welcome!</h1>
      <p>Sign up to start using Simpledo today.</p>
      <form onSubmit={onSubmit}>
        <TextInput placeholder="Full Name" />
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
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
