import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`common-form-group ${className}`} style={{ marginBottom: "15px", display: "flex", flexDirection: "column", textAlign: "left" }}>
      {label && <label htmlFor={id} style={{ marginBottom: "5px", fontWeight: "600", fontSize: "14px" }}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="common-input"
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#1e1e38",
          color: "white",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s ease"
        }}
        {...props}
      />
    </div>
  );
};

export default Input;
