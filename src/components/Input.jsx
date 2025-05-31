import React from "react";

const Input = ({ type = "text", placeholder = "", prefix, ...props }) => {
  //console.log(props.rules);
  return (
    <div className="input-field-wrapper input-wrapper-with-icon">
      <input
        type={type}
        placeholder={placeholder}
        {...props}
        className="form-input default outlined input-with-icon"
      />
      <span className="prefix-icon">{prefix}</span>
    </div>
  );
};

export default Input;
