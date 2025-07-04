import React from "react";
import { useFormContext } from "./Form";

const Button = ({
  type,
  variant = "secondary",
  children,
  disabled: propDisabled,
}) => {
  const { resetForm, fillForm, disabled: formDisabled } = useFormContext();

  const isDisabled = formDisabled || propDisabled;
  // console.log(isDisabled);
  const handleClick = (e) => {
    if (isDisabled) return;
    if (type === "reset") {
      e.preventDefault();
      resetForm();
    } else if (type === "fill") {
      e.preventDefault();
      fillForm();
    }
  };

  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      onClick={handleClick}
      className={`button-item ${variant}`}
      disabled={isDisabled}
    >
      {children || type}
    </button>
  );
};

export default Button;
