import React from "react";

interface Props {
  description: string;
  onRemove(): void;
  onComplete(status: boolean): void;
  key: number;
}

export default (props: Props) => {
  return (
    <div className="task">
      <input
        type="checkbox"
        onClick={(evt) => {
          if ((evt.target as HTMLInputElement).checked === true) {
            props.onComplete(true);
          } else {
            props.onComplete(false);
          }
        }}
      />
      <div>{props.description}</div>
      <button onClick={(evt) => props.onRemove()}> Rem </button>
    </div>
  );
};
