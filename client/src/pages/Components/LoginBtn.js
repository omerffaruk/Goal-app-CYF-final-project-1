import React from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../../utils/fetchData.js";
import { headers } from "../../utils/generalPostObjects.js";
import { validEmail } from "../../utils/validationFunctions";

const LoginBtn = ({ email, password,chk, setErrorDisplay, setLogin, setMissingValidEmail }) => {

	const navigate = useNavigate();
	const handleLogin = (e) => {
		if (chk) {
			localStorage.email = email;
			localStorage.password = password;
			localStorage.rememberUser = chk;
		} else {
			localStorage.removeItem("email");
			localStorage.removeItem("password");
			localStorage.removeItem("chk");
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
		if (validEmail(email)) {
			setMissingValidEmail(false);
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
		} else {
			setMissingValidEmail(true);
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