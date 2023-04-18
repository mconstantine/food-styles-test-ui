import { useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { AuthTokens } from "../state";

type HttpCommandMethod = "POST" | "PUT" | "DELETE";

interface HttpCommand<T> {
  method: HttpCommandMethod;
  path: string;
  input: T;
  authTokens?: AuthTokens | undefined;
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
): [HttpRequest<O>, (input: I) => Promise<O>] {
  const [request, setRequest] = useState<HttpRequest<O>>({ status: "idle" });

  const makeRequest = (input: I) => {
    setRequest({ status: "loading" });

    return window
      .fetch(`${apiUrl}${command.path}`, {
        method: command.method,
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
          ...(command.authTokens
            ? { Authorization: `Bearer ${command.authTokens.access}` }
            : {}),
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
            data: response,
          });

          return response;
        },
        () => {
          setRequest({ status: "failure" });
        }
      );
  };

  return [request, makeRequest];
}
