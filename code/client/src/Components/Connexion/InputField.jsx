import React, { useState } from "react";

const InputField = ({ label, type, id, ariaLabel, onFocusHandler, onBlurHandler }) => {
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
    if (onFocusHandler) onFocusHandler();
  };

  const handleBlur = (e) => {
    setIsActive(e.target.value !== "");
    if (onBlurHandler) onBlurHandler(e);
  };

  return (
    <div className="input-box">
      <input
        type={type}
        id={id}
        className={`input-field ${isActive ? "active" : ""}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={ariaLabel}
        required
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputField;
