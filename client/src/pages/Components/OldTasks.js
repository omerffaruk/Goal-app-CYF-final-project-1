import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getUserTasks from "../../utils/getUserTasks";
import Task from "./Task";

export default function OldTasks({ period, searchKeyWord }) {
	const [previousPeriodTasks, setPreviousPeriodTasks] = useState([]);
	const { username } = useParams();
	const fetchEndPointWithUsername = `/${period}/${username}`;
	useEffect(() => {
		getUserTasks(fetchEndPointWithUsername, setPreviousPeriodTasks);
	}, [fetchEndPointWithUsername]);
	//create completed tasks
	const previousPeriodTasksCompleted = previousPeriodTasks
		.filter(
			(task) =>
				task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setPreviousPeriodTasks}
			/>
		));

	//create incomplete tasks
	const previousPeriodTasksIncomplete = previousPeriodTasks
		.filter(
			(task) =>
				!task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setPreviousPeriodTasks}
			/>
		));

	return (
		<section className="formContainer">
			<form className="tasksForm">
				<p className="completed-h4">Tasks Completed</p>
				<ul className="yesterdayCompletedContainer">
					{previousPeriodTasksCompleted}
				</ul>
				<p className="incomplete-h4">Tasks Incomplete</p>
				<ul className="yesterdayIncompleteContainer">
				{previousPeriodTasksIncomplete}
				</ul>
			</form>
		</section>
	);
}
