import React from "react";

const NavBar = () => {
  return (
		<div className="header login-page">
			<div className="logo-ctn">
				<a href="/">
					<img
						className="logo"
						src={require("../../images/placeholder_logo.png").default}
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
		</div>
	);
};
export default NavBar;
