import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup.js";
const LoginBtn = ({ email, password }) => {
	const [text, setText] = useState("");
 const [popups, setPopups] = useState(false);
	const [login, setLogin] = useState(false);
	const navigate= useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		fetch("https://goal-app-cyf-final-project.herokuapp.com/api/log", {
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
				console.log({ data });
				if (data.user) {
					localStorage.setItem("t", data.user);
					setLogin(true);
					navigate(`/${data.username}`);
				} else {
					//setText("usernamepassword");
					window.alert(text);
				}
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
