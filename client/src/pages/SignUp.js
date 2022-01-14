import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => (

<div className="signup-ctn">
	<h2>Create A New Account</h2>
	<p>Come and join the HTCT community! Let's set up your account. Already have one?<Link to="/">Sign in here</Link></p>
		<div className="s-form">
		<form action="" method="post" className="signup-form">
		<div className="signup-form">
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="username"
					id="name"
					placeholder="your name"
				></input>
			</div>
			<div className="signup-form">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="mail@abc.com"
				></input>
			</div>
			<div className="signup-form">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					placeholder="*********"
				></input>
			</div>
		</form>
		<button type="button">Submit</button>
	</div>
</div>

);

export default SignUp;

/*buttons are just decorative for now*/