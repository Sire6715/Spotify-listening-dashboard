import React from "react";
import {ButtonProps} from "@/interfaces";

const Button: React.FC<ButtonProps> = ({ style, text, onClick }) => {
  return <button onClick={onClick} className={style}>{text}</button>;
};

export default Button;
