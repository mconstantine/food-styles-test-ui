import { useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { AuthTokens } from "../state";
import { ServerError } from "./ServerError";

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
  code: number;
}

type HttpRequest<T> =
  | IdleHttpRequest
  | LoadingHttpRequest
  | SuccessfulHttpRequest<T>
  | FailedHttpRequest;

export function useCommand<I, O>(
  command: Omit<HttpCommand<I>, "input">
): [HttpRequest<O>, (input: I) => Promise<O | null>] {
  const [request, setRequest] = useState<HttpRequest<O>>({ status: "idle" });

  const makeRequest = (input: I): Promise<O | null> => {
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
        (response) =>
          new Promise((accept, reject) => {
            if (Math.floor(response.status / 100) !== 2) {
              reject(new ServerError(response.status, response.statusText));
            } else {
              accept(response.json());
            }
          }),
        () => {
          setRequest({
            status: "failure",
            code: 500,
          });
        }
      )
      .then(
        (response) => {
          const data = response as O;

          setRequest({
            status: "success",
            data,
          });

          return data;
        },
        (e) => {
          if (e instanceof ServerError) {
            setRequest({
              status: "failure",
              code: e.code,
            });
          } else {
            setRequest({
              status: "failure",
              code: 500,
            });
          }

          return null;
        }
      );
  };

  return [request, makeRequest];
}
