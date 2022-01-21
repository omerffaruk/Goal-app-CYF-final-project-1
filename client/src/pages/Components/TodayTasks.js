import React, { useState, useRef, useEffect } from "react";
import {
	MdEditNote,
	MdDone,
	MdDeleteOutline,
	MdMoreVert,
} from "react-icons/Md";
export function TodayTasks({ task, setTodayTasks, handleAddNewTask, index }) {
	const [todayValue, setTodayValue] = useState(task.task);
	const [isDisable, setIsDisable] = useState(true);
	function handleChange(event) {
		setTodayValue(event.target.value);
		setTodayTasks((prev) => {
			const updatedData = [...prev];
			updatedData[index].task = event.target.value;
			return updatedData;
		});
	}
	function handleDelete(index) {
		setTodayTasks((prev) => {
			const updatedData = [...prev];
			updatedData.splice(index, 1);
			return updatedData;
		});
	}
	///reate Ref to focus on input area
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
						handleChange(event);
					}
				}}
			/>
			{/* <button
				style={{ cursor: "pointer", border: "none" }}
				type="button"
				onClick={() => setIsDisable((prev) => !prev)}
			>
				<MdMoreVert />
			</button> */}
			<div className="today-task-show-btn-container">
				{/* //////   Edit task */}
				<button
					style={{ cursor: "pointer" }}
					type="button"
					onClick={() => setIsDisable((prev) => !prev)}
				>
					<MdEditNote />
				</button>
				{/* ////// Approve after Edit task */}
				{!isDisable && (
					<button
						style={{ cursor: "pointer" }}
						type="button"
						onClick={() => setIsDisable((prev) => !prev)}
					>
						<MdDone />
					</button>
				)}
				{/* //////   Delete task */}
				<button
					style={{ cursor: "pointer" }}
					type="button"
					onClick={() => handleDelete(index)}
				>
					<MdDeleteOutline />
				</button>
			</div>
		</li>
	);
}
//ADD NEW TASK
export function NewTask({ handleAddNewTask }) {
	const [todayValue, setTodayValue] = useState("");
	function handleChange(event) {
		setTodayValue(event.target.value);
	}

	return (
		<input
			className="new-task-input"
			type="text"
			autoFocus
			name="newTask"
			placeholder="Enter for new task..."
			value={todayValue}
			onChange={handleChange}
			// disabled={true}
			onKeyPress={(event) => {
				if (event.key === "Enter") {
					event.preventDefault();
					handleAddNewTask(todayValue);
					setTodayValue("");
				}
			}}
		/>
	);
}
