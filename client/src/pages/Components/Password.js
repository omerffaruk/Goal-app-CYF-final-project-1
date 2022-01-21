import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

const Password = () => {
	const [email, setEmail] = useState("");
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
				email: email,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch();
	};

	return (
		<div>
			<div className="forgot-psw-ctn">
				<div className="form">
					<div>
						<h2>Forgot your password?</h2>
						<p>
							Please enter the email address registered for your account. A
							verification code will be sent. You will be able to choose a new
							password for your account.
						</p>
					</div>
					<form action="" method="get">
						<div className="form-field">
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
						<button className="login-btn" onClick={(e) => forgotPassword(e)}>
							Submit
						</button>
						{/* <a href="#">Forgot Password ?</a> */}
					</form>
				</div>
				<Link className="temporary-link" to={"/reset_password/:id"}>
					Click here to enter password and follow instructions in email
				</Link>
			</div>
		</div>
	);
};

export default Password;
