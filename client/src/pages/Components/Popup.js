import React from "react";
import { useState } from "react";
import "../SignUp.css";

const Popup = ({ text }) => {
	const [popup, setPopup] = useState(true);
	const handleClick = () => {
		
		setPopup(!popup)
	 }
 	return (
		<>
			<div className="popup-box" style={{ display: popup ? "flex" : "none" }}>
				<p>{text}</p>
				<pre>          </pre>
				<button className="popup-btn" onClick={handleClick}>
					Close
				</button>
			</div>
		</>
	);
};

export default Popup;
