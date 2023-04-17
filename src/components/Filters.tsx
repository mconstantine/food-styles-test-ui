import { useSetRecoilState } from "recoil";
import { ListTodosFilter, listTodos } from "../utils/listTodos";
import "./Filters.css";
import { MouseEventHandler, useState } from "react";
import { todoListState } from "../state";

export function Filters() {
  const setTodoListState = useSetRecoilState(todoListState);
  const [currentFilter, setCurrentFilter] = useState<ListTodosFilter>(
    ListTodosFilter.All
  );

  const makeFilterClickCallback = (filter: ListTodosFilter) => {
    return () => {
      listTodos(filter).then((todos) => {
        setTodoListState({
          status: "success",
          todos,
        });
        setCurrentFilter(filter);
      });
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
