import React from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { headers } from "../../utils/generalPostObjects";
import fetchData from "../../utils/fetchData";
const Password = () => {
	const [email, setEmail] = useState("");
	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	const forgotPassword = (e) => {
		e.preventDefault();
		const methodObj = {
			method: "POST",
			headers,
			body: JSON.stringify({
				email: email,
			}),
		};
		fetchData(`/email`, methodObj)
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
