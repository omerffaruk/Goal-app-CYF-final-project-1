import React,{ useState } from "react";
import TemporaryTasks from "../Temporary/TemporaryTasks";
import { useNavigate } from "react-router-dom";

const LoginBtn = ({ email, password }) => {
	const [login, setLogin] = useState(false);
	const navigate= useNavigate()
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
				console.log({data})
				if (data.user) {
					localStorage.setItem("t", data.user);
					setLogin(true);
					navigate(`/${data.username}`)
				} else window.alert("error");
			})
			.catch((e) => console.log(e));
	};

	return (
		<div>
			<button className="login-btn" onClick={(e) => handleLogin(e)}>
				Login
			</button>
		</div>
	);
};

export default LoginBtn;
