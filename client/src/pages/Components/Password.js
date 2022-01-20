import React from "react";
import { useState } from "react"

const Password = () => {

  const [email, setEmail ]= useState("");
	const handleChange = (e) => {
		setEmail(e.target.value);
		
	};
  const forgotPassword = (e) => {
    e.preventDefault();
    
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
   <div className="form">
				<form action="" method="get" className="login-form">
					<div className="login-form">
						<div className="label-ctn">
							<label htmlFor="email">Email</label>
						</div>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => handleChange(e)}
							placeholder="Email address"
							aria-required
						></input>
					</div>
      <button onClick={(e)=>forgotPassword(e)} >Enter Email</button>
          {/* <a href="#">Forgot Password ?</a> */}
          </form>
        </div>
        
    </div>
  );
};

export default Password;