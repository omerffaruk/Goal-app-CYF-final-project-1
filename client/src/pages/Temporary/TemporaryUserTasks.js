import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./TemporaryTasksStyling.css";

function TemporaryUserTasks() {
	const location = useLocation();
	const { username } = useParams();
	const { userTasks } = location.state;
	console.log(userTasks);

	const usersAllTasks = userTasks.map((task, i) => {
		return (
			<div key={task.taskid} className="each-task">
				<h3>Task {i + 1}</h3>
				<ul>
					<li>Date: {task.date}</li>
					<li>Task: {task.task}</li>
					<li>Is task completed: {task.iscomplete ? "Yes! Well done" : "Not yet"}</li>
					<li>Role: {task.role}</li>
				</ul>
			</div>
		);
	});

	return (
		<div className="home-ctn user-tasks">
			<h2>{username}'s Tasks</h2>
			{usersAllTasks}
			<h3>
				<Link className="temporary-link" to={"/"}>Go back to Home Page</Link>
			</h3>
			<h3>
				<Link className="temporary-link" to={"/temporary/tasks"}>Go back to Tasks Page</Link>
			</h3>
		</div>
	);
}

export default TemporaryUserTasks;
