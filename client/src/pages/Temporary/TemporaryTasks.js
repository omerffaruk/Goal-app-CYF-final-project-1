import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TemporaryTasks() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const api = "https://goal-app-cyf-final-project.herokuapp.com/api/tasks";

	const fetchTasks = async () => {
		const tasksData = await fetch(api);
		const tasksJson = await tasksData.json();
		setTasks(tasksJson);
		setLoading(false);
		return tasksJson;
	};
	useEffect(() => {
		fetchTasks();
	}, []);

	const filterEachUsersTasks = (userName) => {
		return tasks.filter((task) => task.username === userName);
	};

	const uniqueUserNames = tasks
		.map((task) => task.username)
		.filter((username, i, ar) => ar.indexOf(username) === i);

	const usersTaskLinks = uniqueUserNames.map((username) => {
		return (
			<h3 key={username}>
				<Link
					className="temporary-link"
					to={`${username}`}
					state={{
						userTasks: filterEachUsersTasks(username),
					}}
				>
					{username}'s Tasks
				</Link>
			</h3>
		);
	});

	if(loading) {
		return <div className="loading"></div>;
	}

	return (
		<div className="temporary-links-container">
			{usersTaskLinks}
			<Link className="temporary-link" to={"/"}>
				<h3>Go to Homepage</h3>
			</Link>
		</div>
	);
}

export default TemporaryTasks;