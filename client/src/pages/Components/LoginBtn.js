import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup.js";
import fetchData from "../../utils/fetchData.js";
import { headers } from "../../utils/generalPostObjects.js";

const LoginBtn = ({ email, password, setErrorDisplay }) => {
	const [text, setText] = useState("");
	const [popups, setPopups] = useState(false);
	const [login, setLogin] = useState(false);
	const navigate = useNavigate();
	const handleLogin = (e) => {
		e.preventDefault();
		const methodObj = {
			method: "POST",
			headers,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		fetchData("/log", methodObj)
			.then((res) => res.json())
			.then((data) => {
				console.log({ data });
				if (data.user) {
					localStorage.setItem("t", data.user);
					setErrorDisplay(false);
					setLogin(true);
					navigate(`/${data.username}`);
				} else {
					//setText("usernamepassword");
					 setErrorDisplay(true);
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