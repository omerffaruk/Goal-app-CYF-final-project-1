import { useEffect, useState, React } from "react";
import "./SignUp.css";


import { Link } from "react-router-dom";
import Home from "./Home";

import Popup from "./Components/Popup";
import { useEffect, useState } from "react";

const SignUp = () => {
	const createNewAccount = (e) => {
		e.preventDefault();
		fetch("http://127.0.0.1:3100/api/register", {

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
				name: name,
				email: email,
				password: password,
			}),
		})
			.then((res) => res.json())

			.then((data) => {
				if (data.message) window.alert(data.message);
				else {
					location.assign("/");
					localStorage.setItem("t", data.user);
					window.alert("USER CREATED, now login");
				}
			})

			.catch((e) => console.log(e));
	};

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const handleChange = (e) => {
		if (e) {
			if (e.target.name === "username") {
				setName(e.target.value);
			} else if (e.target.name === "password") {
				setPassword(e.target.value);

			} else setEmail(e.target.value);
		}

	};
	return (
		<div className="signup-ctn">
			<h2>Create A New Account</h2>
			<p>
				Come and join the HTCT community! Let's set up your account. Already
				have one?{" "}
				<Link className="temporary-link" to="/">
					Sign in here
				</Link>
			</p>
			<div className="s-form">
				<form action="" method="post" className="signup-form">
					<div className="signup-form">
						<div className="label-ctn">
							<label htmlFor="name">Name</label>
						</div>
						<input
							type="text"
							name="username"
							id="name"
							placeholder="your name"
							required
							onChange={(e) => {
								handleChange(e);
							}}
						></input>
					</div>
					<div className="signup-form">
						<div className="label-ctn">
							<label htmlFor="email">Email</label>
						</div>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="mail@abc.com"
							required
							onChange={(e) => {
								handleChange(e);
							}}
						></input>
					</div>
					<div className="signup-form">
						<div className="label-ctn">
							<label htmlFor="password">Password</label>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="*********"
							required
							onChange={(e) => {
								handleChange(e);
							}}
						></input>
					</div>
					<div>
						<button
							className="login-btn"
							onClick={(e) => {
								createNewAccount(e);
							}}
						>
							Create Account{" "}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

/*buttons are just decorative for now*/
