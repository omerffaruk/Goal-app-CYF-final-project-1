import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import "./loadinAnimation.css";
import { nanoid } from "nanoid";
import getUserTasks from "../../utils/getUserTasks";
import postTodos from "../../utils/postTodos";
import Task from "./Task";
function UsersTasks({ searchKeyWord }) {
	const [yesterdayTasks, setYesterdayTasks] = useState([]);
	const [todayTasks, setTodayTasks] = useState([]);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username } = useParams();
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
	const beforePeriodItemsDone /*previousPeriodItemsCompleted*/ = yesterdayTasks
		.filter(
			(task) =>
				task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				/*setPreviousPeriodTasks={setYesterdayTasks}*/
				setBeforePeriodTasks={setYesterdayTasks}
			/>
		));
	const beforePeriodItemsUndone /*previousPeriodItemsIncomplete*/ = yesterdayTasks
		.filter(
			(task) =>
				!task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				/*setPreviousPeriodTasks={setYesterdayTasks}*/
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
				<ul className="yesterdayCompletedContainer">{/* {previousPeriodItemsCompleted} */}{beforePeriodItemsDone}</ul>
				<p className="uncompleted-h4">Tasks Incomplete</p>
				<ul className="yesterdayUncompletedContainer">
					{/* previousPeriodItemsIncomplete */}
					{beforePeriodItemsUndone}
				</ul>
				<h3 className="current-h3">Please enter new tasks..</h3>
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
