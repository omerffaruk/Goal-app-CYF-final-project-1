import React from "react";

const Password = () => {
  return (
    <div className="password-ctn">
      <div>
      <input type="checkbox" id="remember-user" name="remember" checked></input>
      <label htmlFor="remember">Remember me</label>
      </div>
      <a href="#">Forgot Password ?</a>
    </div>
  );
};

export default Password;