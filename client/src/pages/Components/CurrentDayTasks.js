import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import "./loadinAnimation.css";
import { nanoid } from "nanoid";
import getUserTasks from "../../utils/getUserTasks";
import postTodos from "../../utils/postTodos";
import Task from "./Task";
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
		postTodos(todayTasks, setIsSubmitting);
	}
	const beforePeriodItemsDone = yesterdayTasks
		.filter((task) => task.iscomplete)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setYesterdayTasks}
			/>
		));
	const beforePeriodItemsUndone = yesterdayTasks
		.filter((task) => !task.iscomplete)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setYesterdayTasks}
			/>
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
				<p className="completed-h4">Tasks Completed</p>
				<ul className="yesterdayCompletedContainer">{beforePeriodItemsDone}</ul>
				<p className="uncompleted-h4">Tasks Incomplete</p>
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
		</section>
	);
}

export default UsersTasks;
