import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = (e) => {
	let { id } = useParams();

	const [password, setPassword] = useState("");
	const handleChange = (e) => {
		setPassword(e.target.value);
		console.log(id);
	};
	const resetpassword = (e) => {
		e.preventDefault();

		fetch(`http://127.0.0.1:3100/api/reset_password/${id}`, {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods":
					"GET, POST, PATCH, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",

				Accept: "application/json",
				"Content-type": "application/json",
			},

			body: JSON.stringify({
				// email: email,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch();
	};

	return (
		<div className="forgot-psw-ctn">
			<div className="form">
				<form action="" method="get">
					<div className="form-field">
						<div className="label-ctn">
							<label htmlFor="password">Password</label>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							aria-required
							onChange={(e) => handleChange(e)}
							placeholder="Password"
						></input>
						<button className="login-btn" onClick={(e) => resetpassword(e)}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
