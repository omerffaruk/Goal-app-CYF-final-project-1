import React from "react";

const NavBar = () => {
  return (
    <div className="header">
      <img
        className="logo"
        src={require("../../images/placeholder_logo.png").default}
        alt=""
      ></img>
      <img className="avatar" src={require("../../images/avatar.png").default} alt=""></img>
    </div>
  );
};
export default NavBar;
