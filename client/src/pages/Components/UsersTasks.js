import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Checkbox";
import TodayTasks from "./TodayTasks";
function UsersTasks() {
	const [yesterdayTasks, setYesterdayTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([{ task: "" }]);

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
				setState((prev) => data.user.concat(prev));
			})
			.catch();
	}
	useEffect(() => {
		fetchData(yesterdayTasksEndPoint, setYesterdayTasks);
		fetchData(todayTasksEndPoint, setTodayTasks);
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		console.log("submitted");
		const yesterdayCheckedTasksId = [];
		const yesterdayUncheckedTasksId = [];
		yesterdayTasks.forEach((task) => {
			task.iscomplete
				? yesterdayCheckedTasksId.push(task.id)
				: yesterdayUncheckedTasksId.push(task.id);
		});

		const todayTasksAlreadySaved = [];
		const todayTasksNew = [];
		todayTasks
			.filter((task) => task.task !== "")
			.forEach((task) => {
				//filter empty ones
				todayTasksNew.push(task.task); //later seperate
				if (task.user_id) {
					todayTasksAlreadySaved.push(task);
				} else {
					// todayTasksNew.push(task.task);//later seperate
				}
			});
		// 	const todayTasksArray = todayTasks.split("\n").filter((yesterdayTasks) => yesterdayTasks);
		const submitData = {
			yesterdayCheckedTasksId,
			yesterdayUncheckedTasksId,
			todayTasksAlreadySaved,
			todayTasksNew,
		};

		const token = localStorage.getItem("t");

		console.log({ token });
		const postObject = {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`, // ADD Token to HEADER
			},
			body: JSON.stringify(submitData),
		};

		// postTodos("newtasks", postObject);
		fetch(`http://127.0.0.1:3100/api/newtasks`, postObject).then((response) => {
			console.log({ response });
		});
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

	const todayTaskInputs = todayTasks.map((task, index) => (
		<TodayTasks
			key={task.id || index}
			setTodayTasks={setTodayTasks}
			task={task}
			index={index}
			handleAddNewTask={handleAddNewTask}
		/>
	));
	function handleAddNewTask() {
		setTodayTasks((prev) => prev.concat({ task: "" }));
	}
	return (
		<section>
			<form onSubmit={handleSubmit}>
				<h4>Yesterday's tasks Dones</h4>
				<ul>{yesterdayItemsDone}</ul>
				<h4>Yesterday's tasks Undones</h4>
				<ul>{yesterdayItemsUndone}</ul>
				<h4>Today's tasks, Please use enter for each plan..</h4>
				<article>
					<ul>{todayTaskInputs}</ul>
					<button type="button" onClick={handleAddNewTask}>
						Add new Task
					</button>
				</article>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
}

export default UsersTasks;
