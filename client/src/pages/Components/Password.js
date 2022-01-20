import React from "react";

const Password = () => {

  const forgotPassword = () => {
    let email = "anna.leeds.uk@gmail.com";
    fetch("http://127.0.0.1:3100/api/email", {
      method: "Post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

        Accept: "application/json",
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        email: email
      })
    }).then(res=>res.json()).then(data=>console.log(data)).catch()
  }
  return (
    <div className="password-ctn">
      <div>
      <input type="checkbox" id="remember-user" name="remember" checked></input>
      <label htmlFor="remember">Remember me</label>
      </div>
      <button onClick={()=>forgotPassword()} >Forgot Password</button>
      {/* <a href="#">Forgot Password ?</a> */}
    </div>
  );
};

export default Password;