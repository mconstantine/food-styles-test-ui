import { useRecoilValue, useSetRecoilState } from "recoil";
import { ListTodosFilter, listTodos } from "../utils/listTodos";
import "./Filters.css";
import { MouseEventHandler, useState } from "react";
import { appState, authTokensState } from "../state";

export function Filters() {
  const setTodoListState = useSetRecoilState(appState);
  const authTokens = useRecoilValue(authTokensState);

  const [currentFilter, setCurrentFilter] = useState<ListTodosFilter>(
    ListTodosFilter.All
  );

  const makeFilterClickCallback = (filter: ListTodosFilter) => {
    return () => {
      if (authTokens) {
        listTodos(filter, authTokens).then((todos) => {
          setTodoListState((state) => {
            switch (state.type) {
              case "anonymous":
                return state;
              case "logged_in":
                return {
                  ...state,
                  todoList: {
                    status: "success",
                    todos,
                  },
                };
            }
          });
          setCurrentFilter(filter);
        });
      } else {
        return;
      }
    };
  };

  return (
    <div className="Filters">
      <p>
        <span>Show:</span>
        &nbsp;
        {Object.entries(ListTodosFilter).map(([label, key]) => (
          <Filter
            key={key}
            isCurrent={key === currentFilter}
            label={label}
            onClick={makeFilterClickCallback(key)}
          />
        ))}
      </p>
    </div>
  );
}

interface FilterProps {
  label: string;
  isCurrent?: boolean | undefined;
  onClick: () => void;
}

function Filter(props: FilterProps) {
  const className = ["Filter", ...(props.isCurrent ? ["current"] : [])].join(
    " "
  );

  const onClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();

    if (!props.isCurrent) {
      props.onClick();
    }
  };

  return (
    <a className={className} href="#" onClick={onClick}>
      {props.label}
    </a>
  );
}
