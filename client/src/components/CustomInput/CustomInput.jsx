import React from "react";
import "./CustomInput.css";

const CustomInput = ({ ...otherProps }) => {
  return <input className="custom-input" {...otherProps} />;
};

export default CustomInput;
