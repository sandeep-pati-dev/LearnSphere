import React from "react";

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary", // primary, danger, secondary
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`common-btn ${variant}-btn ${className}`}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
