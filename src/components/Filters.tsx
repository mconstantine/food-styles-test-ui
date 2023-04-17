import "./Filters.css";
import { MouseEventHandler } from "react";

export function Filters() {
  const makeFilterClickCallback = (filterName: string) => {
    return () => {
      console.log(`TODO: ${filterName}`);
    };
  };

  return (
    <div className="Filters">
      <p>
        <span>Show:</span>
        &nbsp;
        <Filter
          isCurrent
          label="All"
          onClick={makeFilterClickCallback("all")}
        />
        &nbsp;
        <Filter
          label="Completed"
          onClick={makeFilterClickCallback("completed")}
        />
        &nbsp;
        <Filter
          label="Incompleted"
          onClick={makeFilterClickCallback("uncompleted")}
        />
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
