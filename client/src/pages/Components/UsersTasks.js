import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Checkbox";
function UsersTasks() {
	const [yesterdayTasks, setYesterdayTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);

	const { username } = useParams();

	const yesterdayTasksEndPoint = `http://127.0.0.1:3100/api/yesterdaytasks/${username}`;
	const todayTasksEndPoint = `http://127.0.0.1:3100/api/todaytasks/${username}`;

	function fetchData(endpoint, setState) {
		fetch(endpoint, {
			method: "GET",
			headers: { authorization: localStorage.getItem("t") },
		})
			.then((res) => {
				return res.status !== 404 ? res.json() : { user: [] };
			})
			.then((data) => {
				setState(data.user);
			})
			.catch();
	}
	useEffect(() => {
		fetchData(yesterdayTasksEndPoint, setYesterdayTasks);
		fetchData(todayTasksEndPoint, setTodayTasks);
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		const checkedTasksId = [];
		const uncheckedTasksId = [];
		yesterdayTasks.forEach((task) => {
			task.iscomplete
				? checkedTasksId.push(task.id)
				: uncheckedTasksId.push(task.id);
		});
		// 	const todayTasksArray = todayTasks.split("\n").filter((yesterdayTasks) => yesterdayTasks);
		console.log({ checkedTasksId, uncheckedTasksId });
	}
	const yesterdayItemsDone = yesterdayTasks
		.filter((task) => task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setYesterdayTasks} key={task.id} task={task} />
		));
	const yesterdayItemsUndone = yesterdayTasks
		.filter((task) => !task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setYesterdayTasks} key={task.id} task={task} />
		));
	console.log({ yesterdayTasks, yesterdayItemsDone, yesterdayItemsUndone });

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
