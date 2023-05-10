import React, { useState } from "react";
import s from "./Product.module.css";

export const Counter = ({ inputRef }) => {
  const [value, setValue] = useState(1);

  return (
    <>
      <div className={s.buyCounter}>
        <button
          onClick={() => {
            setValue((prev) => (prev === 1 ? 1 : prev - 1));
          }}
        >
          -
        </button>
        <input
          ref={inputRef}
          type="number"
          value={value}
          min={0}
          onChange={(e) =>
            e.currentTarget.value === ""
              ? setValue(1)
              : setValue(e.currentTarget.value)
          }
        />
        <button
          onClick={() => {
            setValue((prev) => prev + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
};
