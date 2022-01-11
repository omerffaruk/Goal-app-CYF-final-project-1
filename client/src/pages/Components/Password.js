import React from "react";

const Password = () => {
  return (
    <div>
      <input type="checkbox" id="remember-user" name="remember" checked></input>
      <label htmlFor="remember">Remember me</label>
      <a href="#">Forgot Password</a>
    </div>
  );
};

export default Password;