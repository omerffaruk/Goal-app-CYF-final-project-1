import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./Components/LoginBtn";
import Password from "./Components/Password";

import "./Home.css";

export function Home() {
	const [message, setMessage] = useState("Loading...");
	const [email, setEmail] = useState("");
	const [popup, setPopup] = useState(false);
	const [password, setPassword] = useState("");

	useEffect(() => {
		fetch("/api")
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
		if ((e.target.name === "email"))
			setEmail(e.target.value);
		else setPassword(e.target.value);
	};
	
	return (
		<div className="home-ctn">
			<h1 className="text-center">Login to your GoalApp account</h1>
			<div className="slack-connect">
				<img
					className="Slack"
					alt=""
					src={require("../images/Slack_logo.png").default}
				></img>
				<h4>Continue with Slack</h4>
			</div>
			<div className="or-ctn">
				<hr />
				<span>OR</span>
				<hr />
			</div>
			<div className="form">
				<form action="" method="get" className="login-form">
					<div className="login-form">
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
					<div className="login-form">
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
					</div>
				</form>
			</div>
			<div>
				<input
					type="checkbox"
					id="remember-user"
					name="remember"
					checked
				></input>
				<label htmlFor="remember">Remember me</label>
			</div>
			{/* <Password /> */}

			<Link to={"/forgot_password"}>Forgot password</Link>

			<LoginBtn className="text-center" email={email} password={password} />
			<div className="create-ctn">
				<p>Not Registered Yet?</p>
				<Link to={"/signup"}>Create an account</Link>
			</div>
		</div>
	);
}

export default Home;
