import React, { useState } from "react";

export default function TodayTasks({
	task,
	setTodayTasks,
	handleAddNewTask,
	index = 0,
}) {
	const [todayValue, setTodayValue] = useState(task.task);
	function handleChange(event) {
		setTodayValue(event.target.value);
		// setTodayTasks((prev) =>
		// 	prev.map((currentTask, i) => {
		// 		if (i === index) {
		// 			currentTask.task = event.target.value;
		// 		}
		// 		return currentTask;
		// 	})
		// );
	}
	return (
		<li>
			<input
				type="text"
				autoFocus
				name="today"
				placeholder="Enter for new task..."
				value={todayValue}
				onChange={handleChange}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleAddNewTask();
					}
				}}
			/>
		</li>
	);
}
