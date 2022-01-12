import { Router } from "express";
import pool from "./utils/pool";

const router = new Router();

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});
// api/tasks returns all the tasks in the database
router.get("/tasks", (_, res) => {
	const selectAllTasksQuery = "SELECT * FROM todo";
	pool.query(selectAllTasksQuery, (error, result) => {
		if (error) {
			console.error(error);
			return res.json(error);
		}
		if (result.rows.length === 0) {
			return res.status(404).json({ message: "There is no task to show" });
		}
		res.status(200).json(result.rows);
	});
});
// api/tasks/:userName returns tasks for a specific user with the username param
router.get("/tasks/:userName", (req, res) => {
	const userName = req.params.userName;
	const selectTasksForUserNameQuery =
		"SELECT todo.id as taskid, users.username, users.id as userid, users.role, users.email, todo.task, todo.date, todo.iscomplete FROM users INNER JOIN todo ON users.id = todo.user_id WHERE users.username = $1";
	pool.query(selectTasksForUserNameQuery, [userName])
	.then((result) => {
		const userTasks = result.rows;
		if (userTasks.length === 0) {
			res.status(404)
				.send({
					message: `The user with the username ${userName} has no tasks!`,
				});
			return;
		}
		res.status(200).json(userTasks);
	});
});

export default router;
