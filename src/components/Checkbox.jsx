import React from "react";

const Checkbox = ({ checked, onChange, disabled, children, name, id }) => {
  // console.log(checked);
  const checkboxId = id || name;

  return (
    <div className="checkbox-section">
      <label htmlFor={checkboxId} className="checkbox-label">
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox"
        />
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
