import React from "react";

const NavBar = () => {
  return (
		<div className="header">
			<a href="/">
				<img
					className="logo"
					src={require("../../images/placeholder_logo.png").default}
					alt=""
				/>
			</a>
			<img
				className="avatar"
				src={require("../../images/avatar.png").default}
				alt=""
			></img>
		</div>
	);
};
export default NavBar;
