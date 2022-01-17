import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "../Components/Checkbox";
function UsersTasks() {
	const [tasks, setTasks] = useState([]);

	const { username } = useParams();

	const api = `http://127.0.0.1:3100/api/tasks/${username}`;

	useEffect(() => {
		fetch(api, {
			method: "GET",
			headers: { authorization: localStorage.getItem("t") },
		})
			.then((res) => res.json())
			.then((data) => setTasks(data.user))
			.catch();
	}, []);

	const yesterdayItems = tasks.map((tasks) => (
		<Checkbox key={tasks.taskid} task={tasks} />
	));

	return <ul>{yesterdayItems}</ul>;
}

export default UsersTasks;
