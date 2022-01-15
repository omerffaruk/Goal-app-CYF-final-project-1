import { Router } from "express";
import pool from "./utils/pool";
const bcrypt = require("bcrypt");

const router = new Router();

//validates data and registers new user in the database if user doesn't already exists

router.post("/register", (req, res) => {
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);

	const userName = req.body.name;
	
	const email = req.body.email;
	const passwords = req.body.password;

	if (validEmail(email)) {
		//console.log(`${req.body.name}`)
		let role = "trainee";
		let slackid = "148999889";
       //hashing algorithm to store passwords in database
		const salt = bcrypt.genSaltSync(10);
		const newpassword = bcrypt.hashSync(passwords, salt);
		let query;
		query = "select * from users where username=$1 or email=$2";

		pool
			.query(query, [userName, email])
			.then((result) => {
				if (result.rowCount > 0) {
					res.status(200).json({ message: "user/email already exists" });
				} else {
					query =
						"insert into users(username,email,password,slackid,role) values($1,$2,$3,$4,$5)";
					pool
						.query(query, [userName, email, newpassword, slackid, role])
						.then((result) => {
							res.status(200).json({ message: "user created" });
						})
						.catch((e) => res.status(500).send({ message: "server error" }));
				}
				//validate credentials
			})
			.catch((e) => res.status(500).send({ message: "server error" }));
	} else res.status(200).json({message: "email invalid" });
	function validEmail(useremail) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
	}
});

router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});
// api/tasks returns all the tasks in the database
router.get("/tasks", (_, res) => {
	const selectAllTasksQuery =
		"SELECT todo.id as taskId, todo.task, todo.date, todo.iscomplete, todo.user_id as userId, users.username, users.password, users.email, users.role FROM todo INNER JOIN users ON todo.user_id = users.id";
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
	pool.query(selectTasksForUserNameQuery, [userName]).then((result) => {
		const userTasks = result.rows;
		if (userTasks.length === 0) {
			res.status(404).send({
				message: `The user with the username ${userName} has no tasks!`,
			});
			return;
		}
		res.status(200).json(userTasks);
	});
});

export default router;
