import React from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData.js";
import { headers } from "../../utils/generalPostObjects.js";
import { validEmail, validPassword } from "../../utils/validationFunctions";

const LoginBtn = ({
	email,
	password,
	chk,
	setErrorDisplay,
	setLogin,
	setMissingValidEmail,
	setMissingValidPassword,
}) => {
	const navigate = useNavigate();
	const handleLogin = (e) => {
		if (chk) {
			localStorage.email = email;
			localStorage.password = password;
			localStorage.rememberUser = chk;
		} else {
			localStorage.removeItem("email");
			localStorage.removeItem("password");
		}
		e.preventDefault();
		const methodObj = {
			method: "POST",
			headers,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		if (!validEmail(email)) {
			setErrorDisplay(false);
			setMissingValidPassword(false);
			setMissingValidEmail(true);
		} else if(!validPassword(password)) {
			setErrorDisplay(false);
			setMissingValidEmail(false);
			setMissingValidPassword(true);
		} else {
			setMissingValidEmail(false);
			setMissingValidPassword(false);
			fetchData("/log", methodObj)
				.then((res) => res.json())
				.then((data) => {
					if (data.user) {
						localStorage.setItem("t", data.user);
						setErrorDisplay(false);
						setLogin(true);
						navigate(`/${data.username}`);
					} else {
						setErrorDisplay(true);
					}
				})
				.catch((e) => console.log(e));
		}
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