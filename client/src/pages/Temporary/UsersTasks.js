import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


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

	return (
		<>
			<ul>
				{[...tasks].map((task) => (
					<>
						<li> {task.task }</li>
						<li> {task.iscomplete ?'true':'false'}</li> </>
					

				))}
			</ul>
		</>
	);
}

export default UsersTasks;
