import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function UsersTasks() {
	const [tasks, setTasks] = useState([]);
	
	const { username } = useParams();
	const api = `http://127.0.0.1:3100/api/tasks/${username}`;

	useEffect(() => {
		fetch(api, {
			method: "GET",
			headers: { authorization: localStorage.getItem("t") },
		})
			.then((res) => res.json())
			.then((data) => setTasks(data.user))
			.catch();
	}, []);

	return (
		<>
			<ul>
				{[...tasks].map((tasks) => (
					<li>{tasks.task}</li>
				))}
			</ul>
		</>
	);
}

export default UsersTasks;
