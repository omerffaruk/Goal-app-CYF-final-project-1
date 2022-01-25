import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import { TodayTasks, NewTask } from "./TodayTasks";
import "./userTasksStyle.css";
import "./loadinAnimation.css";
import { nanoid } from "nanoid";
import getUserTasks from "../../utils/getUserTasks";
import postTodos from "../../utils/postTodos";
import { MdOutlineFilterList } from "react-icons/md";
import { Link } from "react-router-dom";
function UsersTasks({ period }) {
	const [beforePeriodTasks, setBeforePeriodTasks] = useState([]);
	const [currentPeriodTasks, setCurrentPeriodTasks] = useState([]);
	const [beforePeriodEndPoint, setBeforePeriodEndPoint] =
		useState("yesterdaytasks");
	const [currentPeriodEndPoint, setCurrentPeriodEndPoint] =
		useState("todaytasks");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { username } = useParams();
	const navigate = useNavigate();

	const beforeFetchEndPointWithUsername = `/${beforePeriodEndPoint}/${username}`;
	const currentEndPointWithUsername = `/${currentPeriodEndPoint}/${username}`;
	const [toggleMenuClass, setToggleMenuClass] = useState(false);
	useEffect(() => {
		getUserTasks(beforeFetchEndPointWithUsername, setBeforePeriodTasks);
		getUserTasks(currentEndPointWithUsername, setCurrentPeriodTasks);
	}, [beforePeriodEndPoint, currentPeriodEndPoint]);
	//Submit
	function handleSubmit(event) {
		event.preventDefault();
		setIsSubmitting(true);
		postTodos(beforePeriodTasks, currentPeriodTasks, setIsSubmitting);
	}
	const beforePeriodItemsDone = beforePeriodTasks
		.filter((task) => task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setBeforePeriodTasks} key={task.id} task={task} />
		));
	const beforePeriodItemsUndone = beforePeriodTasks
		.filter((task) => !task.iscomplete)
		.map((task) => (
			<Checkbox setTasks={setBeforePeriodTasks} key={task.id} task={task} />
		));

	const currentPeriodTaskInputs = currentPeriodTasks.map((task, index) => (
		<TodayTasks
			key={task.id}
			setCurrentPeriodTasks={setCurrentPeriodTasks}
			task={task}
			index={index}
			handleAddNewTask={handleAddNewTask}
		/>
	));

	function handleAddNewTask(newTask) {
		newTask.length > 0 &&
			setCurrentPeriodTasks((prev) =>
				prev.concat({ id: nanoid(10), task: newTask })
			);
	}

	const handleLogout = () => {
		localStorage.removeItem("t");
		navigate("/ ");
	};
	return (
		<section className="formContainer">
			<div className={`animation-container ${isSubmitting && "animate"}`}>
				<div className="loading-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<section className="task-filter-container">
				<MdOutlineFilterList
					className={"task-filter-icon"}
					onClick={() => setToggleMenuClass((prev) => !prev)}
				/>
				<div
					className={`filter-btn-container ${toggleMenuClass ? "open" : ""}`}
				>
					<Link
						className={`${period === "daily" ? "active" : ""}`}
						onClick={() => {
							setBeforePeriodEndPoint("yesterdaytasks");
							setCurrentPeriodEndPoint("todaytasks");
							setToggleMenuClass(false);
						}}
						to={`/${username}`}
					>
						Daily
					</Link>
					<Link
						className={`${period === "weekly" ? "active" : ""}`}
						onClick={() => {
							setBeforePeriodEndPoint("lastweektasks");
							setCurrentPeriodEndPoint("thisweektasks");
							setToggleMenuClass(false);
						}}
						to={`/${username}/weekly`}
					>
						Weekly
					</Link>
					<Link
						className={`${period === "monthly" ? "active" : ""}`}
						onClick={() => {
							setBeforePeriodEndPoint("lastmonthtasks");
							setCurrentPeriodEndPoint("thismonthtasks");
							setToggleMenuClass(false);
						}}
						to={`/${username}/monthly`}
					>
						Monthly
					</Link>
					<Link
						className={`${period === "quarterly" ? "active" : ""}`}
						onClick={() => {
							setBeforePeriodEndPoint("lastquartertasks");
							setCurrentPeriodEndPoint("thisquartertasks");
							setToggleMenuClass(false);
						}}
						to={`/${username}/quarterly`}
					>
						Quarterly
					</Link>
				</div>
				<input className="task-search" type="text" placeholder="Search..." />
			</section>
			<form className="tasksForm" onSubmit={handleSubmit}>
				<h4 className="completed-h4">Before Priod tasks Completed</h4>
				<ul className="yesterdayCompletedContainer">{beforePeriodItemsDone}</ul>
				<h4 className="uncompleted-h4">Before Period tasks Incomplete</h4>
				<ul className="yesterdayUncompletedContainer">
					{beforePeriodItemsUndone}
				</ul>
				<h3 className="current-h3">
					Current Period tasks, Please press enter for each new task..
				</h3>
				<article className="today-todos-container">
					<ul>{currentPeriodTaskInputs}</ul>
					<NewTask handleAddNewTask={handleAddNewTask} />
				</article>
				<button className="todo-submit-btn login-btn" type="submit">
					Submit
				</button>
			</form>

			<div>
				<button
					className="todo-submit-btn login-btn"
					onClick={() => handleLogout()}
				>
					{" "}
					LogOut{" "}
				</button>
			</div>
		</section>
	);
}

export default UsersTasks;
