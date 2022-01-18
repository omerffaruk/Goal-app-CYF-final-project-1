import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Checkbox";
function UsersTasks() {
	const [tasks, setTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);

	const { username } = useParams();

	const api = `http://127.0.0.1:3100/api/todaytasks/${username}`;

	useEffect(() => {
		fetch(api, {
			method: "GET",
			headers: { authorization: localStorage.getItem("t") },
		})
			.then((res) => res.json())
			.then((data) => {
				setTasks(data.user);
				setTodayTasks(data.user);
			})
			.catch();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		const checkedTasksId = [];
		const uncheckedTasksId = [];
		tasks.forEach((task) => {
			task.iscomplete
				? checkedTasksId.push(task.id)
				: uncheckedTasksId.push(task.id);
		});
		// 	const todayTasksArray = todayTasks.split("\n").filter((tasks) => tasks);
		console.log({ checkedTasksId, uncheckedTasksId });
	}
	const yesterdayItemsDone = tasks
		.filter((task) => task.iscomplete)
		.map((task) => <Checkbox setTasks={setTasks} key={task.id} task={task} />);
	const yesterdayItemsUndone = tasks
		.filter((task) => !task.iscomplete)
		.map((task) => <Checkbox setTasks={setTasks} key={task.id} task={task} />);
	console.log({ tasks, yesterdayItemsDone, yesterdayItemsUndone });

	return (
		<section>
			<form onSubmit={handleSubmit}>
				<h4>Yesterday's tasks Dones</h4>
				<ul>{yesterdayItemsDone}</ul>
				<h4>Yesterday's tasks Undones</h4>
				<ul>{yesterdayItemsUndone}</ul>
				<h4>Today's tasks, Please use enter for each plan..</h4>
				<textarea
					placeholder="Write something for today"
					required
					name="todayTasks"
					cols="60"
					rows="5"
					value={"WILL BE UPDATED..."}
					onChange={(event) => setTodayTasks(event.target.value)}
				></textarea>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
}

export default UsersTasks;
