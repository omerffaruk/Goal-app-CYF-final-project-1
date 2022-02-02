import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import "./loadinAnimation.css";
import getUserTasks from "../../utils/getUserTasks";
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

	const previousPeriodItemsCompleted = yesterdayTasks
		.filter(
			(task) =>
				task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setYesterdayTasks}
			/>
		));
	const previousPeriodItemsIncomplete = yesterdayTasks
		.filter(
			(task) =>
				!task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setYesterdayTasks}
			/>
		));

	const currentPeriodTaskInputs = todayTasks.map((task, index) => (
		<TodayTasks
			key={task.id}
			setTodayTasks={setTodayTasks}
			task={task}
			index={index}
			handleAddNewTask={handleAddNewTask}
		/>
	));

	function handleAddNewTask(task) {
		setTodayTasks((prev) => prev.concat(task));
	}
	return (
		<section className="formContainer">
			<form className="tasksForm">
				<div className={`animation-container ${isSubmitting && "animate"}`}>
					<div className="loading-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<p className="completed-h4">Tasks Completed</p>
				<ul className="yesterdayCompletedContainer">
					{previousPeriodItemsCompleted}
				</ul>
				<p className="incomplete-h4">Tasks Incomplete</p>
				<ul className="yesterdayIncompleteContainer">
					{previousPeriodItemsIncomplete}
				</ul>
				<h3 className="current-h3">Please enter new tasks..</h3>
				<article className="today-todos-container">
					<ul>{currentPeriodTaskInputs}</ul>
					<NewTask
						handleAddNewTask={handleAddNewTask}
						setIsSubmitting={setIsSubmitting}
					/>
				</article>
			</form>
		</section>
	);
}

export default UsersTasks;
