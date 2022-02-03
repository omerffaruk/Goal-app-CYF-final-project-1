import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";


const NavBar = ({ login, setLogin }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("t");
		setLogin(false);
		navigate("/");
	};
	const logout = (
		<div className="avatar-ctn">
			<button
				className="logout-btn"
				aria-label="logout"
				onClick={() => handleLogout()}
			>
				<FiLogOut />
			</button>
		</div>
	);

	const about = (
		<div className="about-link-ctn">
			<Link className="about-link" to={"/about"}>
				<h2>About</h2>
			</Link>
		</div>
	);

	const displayAboutOrLogout = login ? logout : about;

	return (
		<div className="header login-page">
			<div className="logo-ctn">
				<a href="/">
					<img
						className="logo"
						id="logo"
						src={require("../../images/logo-white-edit.png").default}
						alt="logo"
						aria-label="link button to home page"
					/>
				</a>
			</div>
			<div>
				{" "}
				<Link className="guide-link-ctn" to={"/guide"}>
					Guide{" "}
				</Link>{" "}
			</div>
			{displayAboutOrLogout}
		</div>
	);
};
export default NavBar;
