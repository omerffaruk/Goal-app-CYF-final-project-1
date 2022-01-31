

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./Components/LoginBtn";

import fetchData from "../utils/fetchData";
import "./Home.css";

//import "./styles.css";

export function Home({ setLogin }) {
	const [setMessage] = useState("Loading...");
	const [email, setEmail] = useState(localStorage.getItem("email"));
	const [remember, setRemember] = useState(true);
	const [password, setPassword] = useState(localStorage.getItem("password"));
	const [rememberUser, setRememberUser] = useState(localStorage.getItem("chk"));

	const [errorDisplay, setErrorDisplay] = useState(false);

	useEffect(() => {
		fetchData("")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.name === "email") {
			setEmail(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};
	const handleRemember = () => {
		if (remember) {
			localStorage.setItem("email", email);
			setEmail(email);
			localStorage.setItem("chk", true);

			localStorage.setItem("password", password);
			setPassword(password);
			setRemember(!remember);
		} else {
			setRememberUser(false);
			localStorage.removeItem("email");
			localStorage.removeItem("chk");
			localStorage.removeItem("password");
		}
	};

	return (
		<div className="home-ctn ">
			<h1 className="text-center">Login to your GoalApp account</h1>
			<div className="slack-connect">
				<a
					href="https://slack.com/openid/connect/authorize?scope=openid&amp;response_type=code&amp;
				redirect_uri=https://055c-2-222-102-147.ngrok.io/api/&amp;client_id=2977670222342.2984355485058"
				>
					<img
						className="Slack"
						alt=""
						src={require("../images/Slack_logo.png").default}
					/>
					<h2>Continue with Slack</h2>
				</a>
			</div>
			<div className="or-ctn">
				<hr />
				<span>OR</span>
				<hr />
			</div>
			<div className="form">
				<form action="" method="get" className="login-form">
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
							value={email ? email : ""}
							aria-label="enter email"
						></input>
					</div>
					<div className="form-field">
						<div className="label-ctn">
							<label htmlFor="password">Password</label>
						</div>
						<input
							type="password"
							name="password"
							id="password"
							aria-required
							aria-label="enter password"
							onChange={(e) => handleChange(e)}
							placeholder="Password"
							value={password ? password : ""}
						></input>
					</div>
					<div className={`error-login ${errorDisplay && "display"}`}>
						Wrong username and/or password! Please try again.
					</div>
				</form>
			</div>
			<div className="bg-green-100 password-ctn">
				<div>
					<input
						type="checkbox"
						id="remember-user"
						name="remember"
						onClick={(e) => handleRemember(e)}
						checked={rememberUser}
						aria-label="check to remember user"
					></input>
					<label htmlFor="remember_user">Remember me</label>
				</div>
				<div>
					<Link to={"/forgot_password"}>Forgot password</Link>
				</div>
			</div>


			<LoginBtn
				className="text-center"
				email={email}
				password={password}
				setLogin={setLogin}
				setErrorDisplay={setErrorDisplay}
			/>
			<div className="create-ctn">
				<p>Not Registered Yet?</p>
				<Link to={"/signup"}>Create an account</Link>
			</div>
		</div>
	);
}

export default Home;