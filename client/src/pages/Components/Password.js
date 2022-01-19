import React from "react";
import { Link } from "react-router-dom";

const Password = () => {
  return (
    <div className="password-ctn">
      <div>
      <input type="checkbox" id="remember-user" name="remember" checked></input>
      <label htmlFor="remember">Remember me</label>
      </div>
      <Link to={"/forgot"}>Forgot Password ?</Link>
    </div>
  );
};

export default Password;