import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getUserTasks from "../../utils/getUserTasks";
import Task from "./Task";

export default function OldTasks({ period }) {
	const [beforePeriodTasks, setBeforePeriodTasks] = useState([]);
	const [isSubmitting] = useState(false);
	const { username } = useParams();
	//this link will be dynamic
	const fetchEndPointWithUsername = `/${period}/${username}`;
	useEffect(() => {
		getUserTasks(fetchEndPointWithUsername, setBeforePeriodTasks);
	}, [fetchEndPointWithUsername]);
	//create completed tasks
	const beforePeriodTasksCompleted = beforePeriodTasks
		.filter((task) => task.iscomplete)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setBeforePeriodTasks}
			/>
		));

	//create incompleted tasks
	const beforePeriodTasksIncompleted = beforePeriodTasks
		.filter((task) => !task.iscomplete)
		.map((task) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setBeforePeriodTasks}
			/>
		));

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
					{beforePeriodTasksCompleted}
				</ul>
				<p className="uncompleted-h4">Tasks Incomplete</p>
				<ul className="yesterdayUncompletedContainer">
					{beforePeriodTasksIncompleted}
				</ul>
			
			</form>
		</section>
	);
}
