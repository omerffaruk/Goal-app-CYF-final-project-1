import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "../Components/Checkbox";
function UsersTasks() {
	const [tasks, setTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState("");

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

	function handleSubmit(event) {
		event.preventDefault();
		const checkedTasksId = [];
		const uncheckedTasksId = [];
		tasks.forEach((task) => {
			task.iscomplete
				? checkedTasksId.push(task.taskid)
				: uncheckedTasksId.push(task.taskid);
		});
		console.log({ checkedTasksId, uncheckedTasksId });
	}

	const yesterdayItems = tasks.map((task) => (
		<Checkbox setTasks={setTasks} key={task.taskid} task={task} />
	));

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<h4>Yesterday's tasks</h4>
				<ul>{yesterdayItems}</ul>
				<h4>Today's tasks, Please use enter for each plan..</h4>
				<textarea
					placeholder="Write something for today"
					name="todayTasks"
					cols="60"
					rows="5"
					value={todayTasks}
					onChange={(event) => setTodayTasks(event.target.value)}
				></textarea>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
}

export default UsersTasks;
