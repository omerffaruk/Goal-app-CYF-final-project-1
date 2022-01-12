import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginBtn from "./Components/LoginBtn";
import Password from "./Components/Password";

import "./Home.css";

export function Home() {
	const [message, setMessage] = useState("Loading...");

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

	return (
    <div className="home-ctn">
      <h1>Login to your account</h1>
      <h2>Daily standup task manager</h2>
      <div className="slack-connect">
        <img
          className="Slack"
          alt=""
          src={require("../images/Slack_logo.png").default}
        ></img>
        <h4>Continue with Slack</h4>
      </div>
      <p>---------- or Sign Up with Email ----------</p>
      <div className="form">
        <form action="" method="get" className="login-form">
          <div className="login-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="mail@abc.com"
            ></input>
          </div>
          <div className="login-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*********"
            ></input>
          </div>
        </form>

      </div>
      <Password />
      <LoginBtn />
       <div className="create-ctn">
         <h4>Not Registered Yet?</h4>
          <Link to="/create">Create an account</Link>
        </div>
			<Link to="/about">About</Link>
    </div>
  );
}



export default Home;
