import React from "react";
import "./CustomButton.css";

const CustomButton = ({ children, isLogout, ...otherProps }) => {
  return (
    <button
      className="custom-button"
      style={isLogout && { backgroundColor: "red", color: "white" }}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
