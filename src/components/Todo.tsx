import { ChangeEventHandler, MouseEventHandler, useEffect } from "react";
import "./Todo.css";
import deleteTodoButtonImage from "../assets/delete-todo-button.svg";
import { useCommand } from "../effects/useCommand";
import { Todo as ITodo, appState, authTokensState } from "../state";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {
  id: number;
  title: string;
  isDone: boolean;
}

export function Todo(props: Props) {
  const setTodoListState = useSetRecoilState(appState);
  const authTokens = useRecoilValue(authTokensState);

  const [deleteTodoRequest, deleteTodo] = useCommand<void, ITodo>({
    path: `/todos/${props.id}/`,
    method: "DELETE",
    authTokens,
  });

  const [markTodoCompletedRequest, markTodoCompleted] = useCommand<void, ITodo>(
    {
      path: `/todos/${props.id}/mark-completed/`,
      method: "PUT",
      authTokens,
    }
  );

  const [markTodoUncompletedRequest, markTodoUncompleted] = useCommand<
    void,
    ITodo
  >({
    path: `/todos/${props.id}/mark-uncompleted/`,
    method: "PUT",
    authTokens,
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.currentTarget.checked) {
      markTodoCompleted();
    } else {
      markTodoUncompleted();
    }
  };

  const onDeleteButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    deleteTodo();
  };

  const isDeleteButtonDisabled = (() => {
    switch (deleteTodoRequest.status) {
      case "idle":
        return false;
      case "loading":
        return true;
      case "success":
        return false;
      case "failure":
        return true;
    }
  })();

  const isMarkCompletedRequestBlocked = (() => {
    switch (markTodoCompletedRequest.status) {
      case "idle":
        return false;
      case "loading":
        return true;
      case "success":
        return false;
      case "failure":
        return true;
    }
  })();

  const isMarkUncompletedRequestBlocked = (() => {
    switch (markTodoUncompletedRequest.status) {
      case "idle":
        return false;
      case "loading":
        return true;
      case "success":
        return false;
      case "failure":
        return true;
    }
  })();

  const isCheckboxDisabled =
    isMarkCompletedRequestBlocked || isMarkUncompletedRequestBlocked;

  useEffect(() => {
    if (deleteTodoRequest.status === "success") {
      setTodoListState((state) => {
        switch (state.type) {
          case "anonymous":
            return state;
          case "logged_in":
            switch (state.todoList.status) {
              case "failure":
                return state;
              case "success":
                return {
                  ...state,
                  todos: state.todoList.todos.filter(
                    (todo) => todo.id !== deleteTodoRequest.data.id
                  ),
                };
            }
        }
      });
    }
  }, [deleteTodoRequest]);

  useEffect(() => {
    if (markTodoCompletedRequest.status === "success") {
      setTodoListState((state) => {
        switch (state.type) {
          case "anonymous":
            return state;
          case "logged_in":
            switch (state.todoList.status) {
              case "failure":
                return state;
              case "success":
                return {
                  ...state,
                  todos: state.todoList.todos.map((todo) => {
                    if (todo.id === markTodoCompletedRequest.data.id) {
                      return markTodoCompletedRequest.data;
                    } else {
                      return todo;
                    }
                  }),
                };
            }
        }
      });
    }
  }, [markTodoCompletedRequest]);

  useEffect(() => {
    if (markTodoUncompletedRequest.status === "success") {
      setTodoListState((state) => {
        switch (state.type) {
          case "anonymous":
            return state;
          case "logged_in":
            switch (state.todoList.status) {
              case "failure":
                return state;
              case "success":
                return {
                  ...state,
                  todos: state.todoList.todos.map((todo) => {
                    if (todo.id === markTodoUncompletedRequest.data.id) {
                      return markTodoUncompletedRequest.data;
                    } else {
                      return todo;
                    }
                  }),
                };
            }
        }
      });
    }
  }, [markTodoUncompletedRequest]);

  return (
    <div className="Todo" role="listitem">
      <div>
        <input
          id={`todo-${props.id}`}
          name={`todo-${props.id}`}
          type="checkbox"
          checked={props.isDone}
          onChange={onChange}
          disabled={isCheckboxDisabled}
        />
        <label htmlFor={`todo-${props.id}`}>{props.title}</label>
      </div>
      <button
        className="delete-button"
        onClick={onDeleteButtonClick}
        disabled={isDeleteButtonDisabled}
      >
        <img src={deleteTodoButtonImage} alt="Delete todo" />
      </button>
    </div>
  );
}
