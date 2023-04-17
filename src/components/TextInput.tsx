import { HTMLProps } from "react";
import "./TextInput.css";

export function TextInput(props: HTMLProps<HTMLInputElement>) {
  return <input className="TextInput" {...props} />;
}
