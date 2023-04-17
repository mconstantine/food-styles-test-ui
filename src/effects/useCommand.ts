import { useState } from "react";
import { apiUrl } from "../constants/apiUrl";

type HttpCommandMethod = "POST" | "PUT" | "DELETE";

interface HttpCommand<T> {
  method: HttpCommandMethod;
  path: string;
  input: T;
}

interface IdleHttpRequest {
  status: "idle";
}

interface LoadingHttpRequest {
  status: "loading";
}

interface SuccessfulHttpRequest<T> {
  status: "success";
  data: T;
}

interface FailedHttpRequest {
  status: "failure";
}

type HttpRequest<T> =
  | IdleHttpRequest
  | LoadingHttpRequest
  | SuccessfulHttpRequest<T>
  | FailedHttpRequest;

export function useCommand<I, O>(
  command: Omit<HttpCommand<I>, "input">
): [HttpRequest<O>, (input: I) => void] {
  const [request, setRequest] = useState<HttpRequest<O>>({ status: "idle" });

  const makeRequest = (input: I) => {
    setRequest({ status: "loading" });

    window
      .fetch(`${apiUrl}${command.path}`, {
        method: command.method,
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => response.json(),
        () => {
          setRequest({ status: "failure" });
        }
      )
      .then(
        (response) => {
          setRequest({
            status: "success",
            data: response as O,
          });
        },
        () => {
          setRequest({ status: "failure" });
        }
      );
  };

  return [request, makeRequest];
}
