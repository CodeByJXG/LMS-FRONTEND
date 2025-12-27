import React from "react";
import { FiSettings } from "react-icons/fi";


function HeaderButton({ onClick }) {
  return <button className="header-button" onClick={onClick}>⚙️</button>;
}

export default HeaderButton;