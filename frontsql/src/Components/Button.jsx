import React from "react";

export const Button = ({ children, className, handleClick }) => {
  return (
    <button
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
