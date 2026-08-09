import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`common-card ${className}`}
      style={{
        background: "linear-gradient(135deg, #0f0f2d, #15153a)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "12px",
        padding: "25px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
