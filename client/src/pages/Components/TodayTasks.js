import React, { useState, useRef, useEffect } from "react";
import {
	MdModeEdit,
	MdDone,
	MdDeleteOutline,
	MdSubdirectoryArrowLeft,
} from "react-icons/md";
import postTodos from "../../utils/postTodos";
import deleteTodo from "../../utils/deleteTodo";
import updateTodo from "../../utils/updateTodo";
export function TodayTasks({ task, setTodayTasks, index }) {
	const [todayValue, setTodayValue] = useState(task.task);
	const [isDisable, setIsDisable] = useState(true);
	function handleChange(event) {
		setTodayValue(event.target.value);
	}
	function handleSaveClick() {
		setTodayTasks((prev) =>
			prev.map((currentTask) => {
				if (currentTask.id === task.id) {
					currentTask.task = todayValue;
				}
				return currentTask;
			})
		);
		updateTodo(task);
	}
	// function
	function handleDelete() {
		setTodayTasks((prev) => prev.filter((element) => element.id !== task.id));
		deleteTodo(task.id);
	}
	///create Ref to focus on input area
	const inputRef = useRef();
	useEffect(() => {
		if (!isDisable) {
			inputRef.current.focus();
		} else {
			inputRef.current.blur();
		}
	}, [isDisable]);
	return (
		<li>
			<input
				type="text"
				ref={inputRef}
				className="today-task-show"
				name="today"
				placeholder="Enter for new task..."
				value={todayValue}
				onChange={handleChange}
				disabled={isDisable}
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						handleSaveClick();
						setIsDisable(true);
					}
				}}
			/>
			<div className="today-task-show-btn-container">
				{/* //////   Edit task */}
				<button
					aria-label="Edit task"
					className="today-task-edit-icon"
					type="button"
					onClick={() => setIsDisable((prev) => !prev)}
				>
					<MdModeEdit />
				</button>
				{/* ////// Approve after Edit task */}
				{!isDisable && (
					<button
						aria-label="Save changes"
						className="today-task-save-icon"
						style={{ cursor: "pointer" }}
						type="button"
						onClick={() => {
							setIsDisable((prev) => !prev);
							handleSaveClick();
						}}
					>
						<MdDone />
					</button>
				)}
				{/* //////   Delete task */}
				<button
					aria-label="Delete task"
					className="today-task-delete-icon"
					type="button"
					onClick={handleDelete}
				>
					<MdDeleteOutline />
				</button>
			</div>
		</li>
	);
}
//ADD NEW TASK
export function NewTask({ handleAddNewTask, setIsSubmitting }) {
	const [todayValue, setTodayValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	function handleChange(event) {
		setTodayValue(event.target.value);
		if (event.target.value.length > 0) {
			setIsTyping(true);
		} else {
			setIsTyping(false);
		}
	}
	function handleEnter(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			if (event.target.value.length > 0) {
				//send db
				//take id from db
				//add todayTasks with handleAddnewTask
				postTodos(todayValue, setIsSubmitting).then((id) => {
					handleAddNewTask(todayValue, id.id);
				});
				setTodayValue("");
				setIsTyping(false);
			}
		}
	}

	return (
		<div className="new-task-input-container">
			<input
				className="new-task-input"
				type="text"
				autoFocus
				name="newTask"
				placeholder="Enter for new task..."
				value={todayValue}
				onChange={handleChange}
				// disabled={true}
				onKeyPress={handleEnter}
			/>
			{/* <button
				aria-label="Save new task"
				style={{ cursor: "pointer" }}
				type="button"
				onClick={() => {
					postTodos(todayValue, setIsSubmitting).then((id) => {
						handleAddNewTask(todayValue, id);
						setTodayValue("");
						setIsTyping(false);
					});
				}}
				className={`new-task-input-btn  ${isTyping && "active"} `}
			>
				<MdSubdirectoryArrowLeft />
			</button> */}
		</div>
	);
}
