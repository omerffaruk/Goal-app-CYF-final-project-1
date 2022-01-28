import React, { useState, useRef } from "react";
import {
	MdDone,
	MdDeleteOutline,
	MdOutlineIndeterminateCheckBox,
	MdOutlineCheckBox,
} from "react-icons/md";
import updateTodo from "../../utils/updateTodo";
import deleteTodo from "../../utils/deleteTodo";
export default function Task({ task, setPreviousPeriodTasks }) {
	const [taskValue, setTaskValue] = useState(task.task);
	const [isTyping, setIsTyping] = useState(false);
	const inputRef = useRef();
	// Complete - Incomplete task
	function handleCheckboxChange() {
		setPreviousPeriodTasks((prev) =>
		/* setBeforePeriodTasks((prev) => */
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
		setPreviousPeriodTasks((prev) =>
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
		setPreviousPeriodTasks((prev) =>
			prev.filter((element) => element.id !== task.id)
		);
		deleteTodo(task.id);
	}
	function handleSubmit() {
		// setIsSubmitting(true);
		updateTodo(task);
	}
	return (
		<li className="past-task-li-container">
			<label htmlFor="checkbox">
				<input
					type="checkbox"
					defaultChecked={task.iscomplete}
					onChange={handleCheckboxChange}
					value={task.id}
				/>
				{task.iscomplete ? (
					<MdOutlineCheckBox className="completed-checkbox" />
				) : (
					<MdOutlineIndeterminateCheckBox className="incomplete-checkbox" />
				)}
			</label>
			<label className="sr-only" htmlFor={task.id}>
				Click for update
			</label>
			<input
				type="text"
				id={task.id}
				ref={inputRef}
				value={taskValue}
				className="past-task-show"
				onChange={handleInputChange}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleEditClick(event);
					}
				}}
			/>
			<p className="task-date">
				{new Intl.DateTimeFormat("en-US").format(new Date(task.date))}
			</p>
			<div className="today-task-show-btn-container">
				{isTyping && (
					<button
						aria-label="Save changes"
						className="form-icon icon-done"
						type="button"
						onClick={handleEditClick}
					>
						<MdDone />
					</button>
				)}

				<button
					aria-label="Delete"
					className="form-icon icon-delete"
					type="button"
					onClick={() => handleDelete()}
				>
					<MdDeleteOutline />
				</button>
			</div>
		</li>
	);
}
