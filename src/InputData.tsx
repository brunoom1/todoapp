import React from "react";

interface Props {
  onChange(value: string): void;
}

export default (props: Props) => {
  return (
    <div>
      <textarea
        onBlur={(evt) => {
          props.onChange(evt.target.value);
          evt.target.value = "";
        }}
      ></textarea>
    </div>
  );
};
