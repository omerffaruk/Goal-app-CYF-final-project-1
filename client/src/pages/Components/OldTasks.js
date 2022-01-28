import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getUserTasks from "../../utils/getUserTasks";
import Task from "./Task";

export default function OldTasks({ period, searchKeyWord }) {
	const [previousPeriodTasks/*beforePeriodTasks*/, setPreviousPeriodTasks/*setBeforePeriodTasks*/] = useState([]);
	const { username } = useParams();
	const fetchEndPointWithUsername = `/${period}/${username}`;
	useEffect(() => {
		getUserTasks(fetchEndPointWithUsername, setPreviousPeriodTasks/*setBeforePeriodTasks*/);
	}, [fetchEndPointWithUsername]);
	//create completed tasks
	const previousPeriodTasksCompleted/*beforePeriodTasksCompleted*/ = previousPeriodTasks/*beforePeriodTasks*/
		.filter(
			(task) =>
				task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setPreviousPeriodTasks}
				/* setBeforePeriodTasks={setBeforePeriodTasks} */
			/>
		));

	//create incomplete tasks
	const previousPeriodTasksIncomplete/*beforePeriodTasksIncompleted*/ = previousPeriodTasks/*beforePeriodTasks*/
		.filter(
			(task) =>
				!task.iscomplete && task.task.toLowerCase().includes(searchKeyWord)
		)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setPreviousPeriodTasks={setPreviousPeriodTasks}
				/* setBeforePeriodTasks={setBeforePeriodTasks} */
			/>
		));

	return (
		<section className="formContainer">
			<form className="tasksForm">
				<p className="completed-h4">Tasks Completed</p>
				<ul className="yesterdayCompletedContainer">
					{previousPeriodTasksCompleted}
					{/* {beforePeriodTasksCompleted} */}
				</ul>
				<p /* className="uncompleted-h4" */ className="incomplete-h4">Tasks Incomplete</p>
				<ul /* className="yesterdayUncompletedContainer" */className="yesterdayIncompleteContainer">
				{previousPeriodTasksIncomplete}
					{/* {beforePeriodTasksIncompleted} */}
				</ul>
			</form>
		</section>
	);
}
