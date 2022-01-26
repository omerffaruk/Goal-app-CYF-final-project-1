import React, { useState, useRef } from "react";
import { MdDone, MdDeleteOutline } from "react-icons/md";
import updateTodo from "../../utils/updateTodo";
import deleteTodo from "../../utils/deleteTodo";
export default function Task({ task, setBeforePeriodTasks, setIsSubmitting }) {
	const [taskValue, setTaskValue] = useState(task.task);
	const [isTyping, setIsTyping] = useState(false);
	const inputRef = useRef();
	// Complete - Incomplete task
	function handleCheckboxChange() {
		setBeforePeriodTasks((prev) =>
			prev.map((currentTask) => {
				if (currentTask.id === task.id) {
					currentTask.iscomplete = !currentTask.iscomplete;
				}
				return currentTask;
			})
		);

		setTimeout(() => handleSubmit(), 0); //Later search, it didn't work without settimeout
	}

	// Update task value
	function handleInputChange(event) {
		setTaskValue(event.target.value);
		setIsTyping(true);
	}
	//Edit task
	function handleEditClick(event) {
		setBeforePeriodTasks((prev) =>
			prev.map((currentTask) => {
				if (currentTask.id === task.id) {
					currentTask.task = taskValue;
				}
				return currentTask;
			})
		);
		inputRef.current.blur();
		setIsTyping(false);
		handleSubmit();
	}
	//Delete task
	function handleDelete() {
		setBeforePeriodTasks((prev) =>
			prev.filter((element) => element.id !== task.id)
		);
		deleteTodo(task.id);
	}
	function handleSubmit() {
		// setIsSubmitting(true);
		updateTodo(task);
	}
	return (
		<li
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<label>
				<input
					type="checkbox"
					defaultChecked={task.iscomplete}
					onChange={handleCheckboxChange}
					value={task.id}
				/>
				<span></span>
			</label>
			<input
				type="text"
				ref={inputRef}
				value={taskValue}
				className="today-task-show"
				onChange={handleInputChange}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleEditClick(event);
					}
				}}
			/>
			<p>{new Intl.DateTimeFormat("en-US").format(new Date(task.date))}</p>
			<div className="today-task-show-btn-container">
				{/* //////   Edit task */}
				{isTyping && (
					<button
						style={{ cursor: "pointer" }}
						type="button"
						onClick={handleEditClick}
					>
						<MdDone />
					</button>
				)}
				{/* //////   Delete task */}
				<button
					style={{ cursor: "pointer" }}
					type="button"
					onClick={() => handleDelete()}
				>
					<MdDeleteOutline />
				</button>
			</div>
		</li>
	);
}
