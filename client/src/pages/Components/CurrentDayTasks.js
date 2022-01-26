import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import "./loadinAnimation.css";
import { nanoid } from "nanoid";
import getUserTasks from "../../utils/getUserTasks";
import postTodos from "../../utils/postTodos";
function UsersTasks({ period }) {
	const [yesterdayTasks, setYesterdayTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username } = useParams();
	const navigate = useNavigate();

	const yesterdayFetchEndPoint = `/yesterdaytasks/${username}`;
	const todayFetchEndPoint = `/todaytasks/${username}`;
	useEffect(() => {
		getUserTasks(yesterdayFetchEndPoint, setYesterdayTasks);
		getUserTasks(todayFetchEndPoint, setTodayTasks);
	}, []);
	//Submit
	function handleSubmit(event) {
		event.preventDefault();
		setIsSubmitting(true);
		postTodos(yesterdayTasks, todayTasks, setIsSubmitting);
	}
	const beforePeriodItemsDone = yesterdayTasks
		.filter((task) => task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setYesterdayTasks} key={task.id} task={task} />
		));
	const beforePeriodItemsUndone = yesterdayTasks
		.filter((task) => !task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setYesterdayTasks} key={task.id} task={task} />
		));

	const currentPeriodTaskInputs = todayTasks.map((task, index) => (
		<TodayTasks
			key={task.id}
			setCurrentPeriodTasks={setTodayTasks}
			task={task}
			index={index}
			handleAddNewTask={handleAddNewTask}
		/>
	));

	function handleAddNewTask(newTask) {
		newTask.length > 0 &&
			setTodayTasks((prev) => prev.concat({ id: nanoid(10), task: newTask }));
	}

	const handleLogout = () => {
		localStorage.removeItem("t");
		navigate("/");
	};
	return (
		<section className="formContainer">
			<form className="tasksForm" onSubmit={handleSubmit}>
				<div className={`animation-container ${isSubmitting && "animate"}`}>
					<div className="loading-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<h4 className="completed-h4">Tasks Completed</h4>
				<ul className="yesterdayCompletedContainer">{beforePeriodItemsDone}</ul>
				<h4 className="uncompleted-h4">Tasks Incomplete</h4>
				<ul className="yesterdayUncompletedContainer">
					{beforePeriodItemsUndone}
				</ul>
				<h3 className="current-h3">Enter new tasks..</h3>
				<article className="today-todos-container">
					<ul>{currentPeriodTaskInputs}</ul>
					<NewTask handleAddNewTask={handleAddNewTask} />
				</article>
				<button className="todo-submit-btn login-btn" type="submit">
					Submit
				</button>
			</form>

			<div>
				<button
					className="todo-submit-btn login-btn"
					onClick={() => handleLogout()}
				>
					{" "}
					LogOut{" "}
				</button>
			</div>
		</section>
	);
}

export default UsersTasks;
