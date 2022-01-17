import React from "react";
import { useState } from "react";
import TemporaryTasks from "../Temporary/TemporaryTasks";

const LoginBtn = ({ email, password }) => {
	const [login, setLogin] = useState(false);
	const handleLogin = (e) => {
		e.preventDefault();
		fetch("http://127.0.0.1:3100/api/log", {
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
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.user) {
					localStorage.setItem("t", data.user);
					setLogin(true);
				} else window.alert("error");
			})
			.catch((e) => console.log(e));
	};

	return (
		<div>
			<button className="login-btn" onClick={(e) => handleLogin(e)}>
				Login
			</button>
			{login && <TemporaryTasks />}
		</div>
	);
};

export default LoginBtn;
