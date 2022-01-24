import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
		<div className="header login-page">
			<div className="logo-ctn">
				<a href="/">
					<img
						className="logo" id="logo"
						src={require("../../images/logo-white.png").default}
						alt=""
					/>
				</a>
			</div>
			{/* <div className="avatar-ctn">
				<img
					className="avatar"
					src={require("../../images/avatar.png").default}
					alt=""
				/>
			</div> */}
			<div className="about-link-ctn">
				<Link className="about-link" to={"/about"}>
					<h2>About</h2>
				</Link>
			</div>
		</div>
	);
};
export default NavBar;
