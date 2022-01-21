import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import { nanoid } from "nanoid";
import getUserTasks from "../../utils/getUserTAsks";
import postTodos from "../../utils/postTodos";
function UsersTasks() {
	const [yesterdayTasks, setYesterdayTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);
	const { username } = useParams();
	const navigate = useNavigate();
	const yesterdayTasksEndPoint = `/yesterdaytasks/${username}`;
	const todayTasksEndPoint = `/todaytasks/${username}`;

	useEffect(() => {
		getUserTasks(yesterdayTasksEndPoint, setYesterdayTasks);
		getUserTasks(todayTasksEndPoint, setTodayTasks);
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		postTodos(yesterdayTasks, todayTasks);
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
			key={task.id}
			setTodayTasks={setTodayTasks}
			task={task}
			index={index}
			handleAddNewTask={handleAddNewTask}
		/>
	));

	function handleAddNewTask(newTask) {
		setTodayTasks((prev) => prev.concat({ id: nanoid(10), task: newTask }));
	}

	const handleLogout = () => {
		localStorage.removeItem("t");
		navigate("/ ");
	};
	return (
		<section className="formContainer">
			<form className="tasksForm" onSubmit={handleSubmit}>
				<h4>Yesterday's tasks Completed</h4>
				<ul className="yesterdayCompletedContainer">{yesterdayItemsDone}</ul>
				<h4>Yesterday's tasks Incomplete</h4>
				<ul className="yesterdayUncompletedContainer">
					{yesterdayItemsUndone}
				</ul>
				<h3>Today's tasks, Please press enter for each new task..</h3>
				<article className="today-todos-container">
					<ul>{todayTaskInputs}</ul>
					<NewTask handleAddNewTask={handleAddNewTask} />
				</article>
				<button className="todo-submit-btn login-btn" type="submit">
					Submit
				</button>
			</form>

			<div>
				<button onClick={() => handleLogout()}> LogOut </button>
			</div>
		</section>
	);
}

export default UsersTasks;
