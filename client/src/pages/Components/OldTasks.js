import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getUserTasks from "../../utils/getUserTasks";
import Task from "./Task";

export default function OldTasks({ period }) {
	const [beforePeriodTasks, setBeforePeriodTasks] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username } = useParams();
	//this link will be dynamic
	const fetchEndPointWithUsername = `/${period}/${username}`;
	useEffect(() => {
		getUserTasks(fetchEndPointWithUsername, setBeforePeriodTasks);
	}, [fetchEndPointWithUsername]);
	//create completed tasks
	const beforePeriodTasksCompleted = beforePeriodTasks
		.filter((task) => task.iscomplete)
		.map((task, index) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setBeforePeriodTasks}
				setIsSubmitting={setIsSubmitting}
			/>
		));

	//create incompleted tasks
	const beforePeriodTasksIncompleted = beforePeriodTasks
		.filter((task) => !task.iscomplete)
		.map((task, index) => (
			<Task
				key={task.id}
				task={task}
				setBeforePeriodTasks={setBeforePeriodTasks}
				setIsSubmitting={setIsSubmitting}
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
				<h4 className="completed-h4">Tasks Completed</h4>
				<ul className="yesterdayCompletedContainer">
					{beforePeriodTasksCompleted}
				</ul>
				<h4 className="uncompleted-h4">Tasks Incomplete</h4>
				<ul className="yesterdayUncompletedContainer">
					{beforePeriodTasksIncompleted}
				</ul>
				{/* <button className="todo-submit-btn login-btn" type="submit">
					Submit
				</button> */}
			</form>
		</section>
	);
}
