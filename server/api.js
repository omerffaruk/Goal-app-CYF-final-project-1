import { Router } from "express";
import express from "express";
import pool from "./utils/pool";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");

const router = new Router();
router.use(express.json());
router.use(express.urlencoded());

//validates data and registers new user in the database if user doesn't already exists
let slacklogin = {};
let tokenarray = [];
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

		let slackid = "test";

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
						"insert into users(username,email,password,slackid,role) values($1,$2,$3,$4,$5) returning id";
					pool
						.query(query, [userName, email, newpassword, slackid, role])
						.then((result) => {
							const token = createToken(result.rows[0].id);

							res.status(200).json({ user: token });
						})
						.catch((e) => res.status(500).send({ message: "server error" }));
				}
				//validate credentials
			})
			.catch((e) => res.status(500).send({ message: "server error" }));
	} else {
		res.status(200).json({ message: "email invalid" });
	}
	function validEmail(useremail) {
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
	}
});

//authentication for users

const maxAge = 3 * 24 * 24 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "htctsecretserver", {
		expiresIn: maxAge,
	});
};

router.post("/log", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);

	const email = req.body.email;
	const passwords = req.body.password;
	slacklogin["token"] = "";
	let query;
	query = "select * from users where email = $1";
	//res.send(email)
	pool
		.query(query, [email])
		.then((result) => {
			if (result.rows.length > 0) {
				const auth = bcrypt.compareSync(passwords, result.rows[0].password);
				if (auth) {
					const token = createToken(result.rows[0].id);

					res.json({
						user: token,
						username: result.rows[0].username,
					});
				} else {
					res.json("Password do not match");
				}
			} else {
				return res.json("User with this email does not exist!");
			}
		})
		.catch((e) => res.send(e));
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
router.get("/tasks/:username", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);

	let token;
	if (slacklogin["token"].length !== 0) {
		token = slacklogin["token"];
	} else {
		token = req.headers.authorization;
	}
	if (token) {
		const userAuthenticated = jwt.verify(token, "htctsecretserver");

		if (userAuthenticated) {
			const userName = req.params.username;
			const selectTasksForUserNameQuery =
				"SELECT todo.id as taskid, users.username, users.id as userid, users.role, users.email, todo.task, todo.date, todo.iscomplete FROM users INNER JOIN todo ON users.id = todo.user_id WHERE users.username = $1 and users.id=$2 ";
			pool
				.query(selectTasksForUserNameQuery, [userName, userAuthenticated.id])
				.then((result) => {
					const userTasks = result.rows;
					if (userTasks.length === 0) {
						res.status(404).send({
							message: `The user with the username ${userName} has no tasks!`,
						});
						return;
					}
					res.status(200).json({ user: userTasks });
				});
		}
	} else {
		res.send("not authenticated");
	}
});

// api/yesterdaytasks/:username returns tasks for a specific user with the username param
//This endpoint will bring only yesterday's tasks for the specific user
router.get("/yesterdaytasks/:username", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	let token;
	if (slacklogin["token"]) {
		token = slacklogin["token"];
	} else {
		token = req.headers.authorization;
	}

	if (token) {
		const userAuthenticated = jwt.verify(token, "htctsecretserver");

		if (userAuthenticated) {
			const userName = req.params.username;

			const yesterdaytasks = moment().subtract(1, "days");
			console.log(yesterdaytasks);
			const selectTasksForUserNameQuery =
				"SELECT todo.id,todo.user_id,todo.task,todo.iscomplete,todo.date FROM todo INNER JOIN users ON users.id = todo.user_id WHERE users.username = $1 and users.id=$2 and date(todo.date)=$3";
			pool
				.query(selectTasksForUserNameQuery, [
					userName,
					userAuthenticated.id,
					yesterdaytasks,
				])
				.then((result) => {
					const userTasks = result.rows;
					if (userTasks.length === 0) {
						res.status(404).send({
							message: `The user with the username ${userName} has no tasks!`,
						});
						return;
					}
					res.status(200).json({ user: userTasks });
				});
		}
	} else {
		res.send("not authenticated");
	}
});

// api/yesterdaytasks/:username returns tasks for a specific user with the username param
//This endpoint will bring only yesterday's tasks for the specific user
router.get("/todaytasks/:username", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	let token;
	if (!slacklogin["token"]) {
		token = req.headers.authorization;
		console.log(token);
	} else {
		token = slacklogin["token"];
	}

	if (token) {
		const userAuthenticated = jwt.verify(token, "htctsecretserver");

		if (userAuthenticated) {
			const userName = req.params.username;

			const todaytasks = moment();

			const selectTasksForUserNameQuery =
				"SELECT todo.id,todo.user_id,todo.task,todo.iscomplete,todo.date FROM todo INNER JOIN users ON users.id = todo.user_id WHERE users.username = $1 and users.id=$2 and date(todo.date)=$3";
			pool
				.query(selectTasksForUserNameQuery, [
					userName,
					userAuthenticated.id,
					todaytasks,
				])
				.then((result) => {
					const userTasks = result.rows;
					if (userTasks.length === 0) {
						res.status(404).send({
							message: `The user with the username ${userName} has no tasks!`,
						});
						return;
					}
					res.status(200).json({ user: userTasks });
				});
		}
	} else {
		res.send("not authenticated");
	}
});

//adding tasks from client

router.post("/newtasks", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	let userAuthenticated;
	let token;
	if (slacklogin["token"]) {
		token = slacklogin["token"];
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	} else {
		token = req.headers.authorization;
		console.log(token, "====");
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	}

	if (token) {
		//userAuthenticated = jwt.verify(token[1], "htctsecretserver");
		console.log(userAuthenticated, ">>>>>");

		if (userAuthenticated) {
			const {
				yesterdayCheckedTasksId,
				yesterdayUncheckedTasksId,
				todayTasksAlreadySaved,
				todayTasksNew,
			} = req.body;
			// console.log(task, "***************");

			const id = userAuthenticated.id;
			//find todays todos, delete all of them and add new ones
			const deleteTodayTodosQuery = `DELETE FROM todo WHERE id IN
			(SELECT todo.id
				FROM todo
				WHERE user_id = $1 AND
						date >= TIMESTAMP 'today' AND
						date <  TIMESTAMP 'tomorrow') `;
			pool.query(deleteTodayTodosQuery, [id], (error, result) => {
				if (error) {
					return res.status(500).send({ msg: "Database ERROR" });
				}

				//ADD new tasks
				const addTodayValuesQuery = todayTasksNew.map(
					(task) => `($$${task}$$,$1)`
				);
				pool.query(
					`INSERT INTO todo(task,user_id) VALUES ${addTodayValuesQuery.join(
						","
					)} RETURNING id;`,
					[id],
					(error, result) => {
						if (error) {
							return res.status(500).send({ msg: "Database ERROR" });
						}
						// console.log(result.rows, ">>>>>>>RESULT");
						res.send({ id: result.rows[0].id });
					}
				);
			});

			// find yesterday todaysToDos, and if  complatedTodosOfYesterday, change to the true
			const yesterdaysCompletedTasksSetQuery =
				"UPDATE todo SET iscomplete = true WHERE id =ANY ($1)";
			pool.query(
				yesterdaysCompletedTasksSetQuery,
				[yesterdayCheckedTasksId],
				(error, result) => {
					if (error) {
						return res.status(500).send({ msg: "Database ERROR" });
					}
				}
			);
			const yesterdaysUnCompletedTasksSetQuery =
				"UPDATE todo SET iscomplete = false WHERE id =ANY ($1)";
			pool.query(
				yesterdaysUnCompletedTasksSetQuery,
				[yesterdayUncheckedTasksId],
				(error, result) => {
					if (error) {
						return res.status(500).send({ msg: "Database ERROR" });
					}
				}
			);
		}
	} else {
		res.send("not authenticated");
	}
});
router.put("/update", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	let userAuthenticated;
	let token;
	if (slacklogin["token"]) {
		token = slacklogin["token"];
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	} else {
		token = req.headers.authorization;
		console.log(token, "====");
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	}

	if (token) {
		//userAuthenticated = jwt.verify(token[1], "htctsecretserver");
		console.log(userAuthenticated, ">>>>>");

		if (userAuthenticated) {
			const { beforePeriodTask } = req.body;
			console.log(beforePeriodTask, "**************>>>>*");

			const id = userAuthenticated.id;

			// find yesterday todaysToDos, and if  complatedTodosOfYesterday, change to the true
			const updateQuery =
				"UPDATE todo SET task=$1, iscomplete = $2 WHERE id =$3";
			pool.query(
				updateQuery,
				[
					beforePeriodTask.task,
					beforePeriodTask.iscomplete,
					beforePeriodTask.id,
				],
				(error, result) => {
					if (error) {
						return res.status(500).send({ msg: "Database ERROR" });
					}
					res.send({ msg: "data updated" });
				}
			);
		}
	} else {
		res.send("not authenticated");
	}
});
router.delete("/delete", (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	let userAuthenticated;
	let token;
	if (slacklogin["token"]) {
		token = slacklogin["token"];
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	} else {
		token = req.headers.authorization;
		console.log(token, "====");
		userAuthenticated = jwt.verify(token, "htctsecretserver");
	}

	if (token) {
		//userAuthenticated = jwt.verify(token[1], "htctsecretserver");
		console.log(userAuthenticated, ">>>>>");

		if (userAuthenticated) {
			const { taskid } = req.body;
			console.log(taskid, "**************>>>>*");

			const id = userAuthenticated.id;

			// find yesterday todaysToDos, and if  complatedTodosOfYesterday, change to the true
			const deleteQuery = "DELETE FROM todo WHERE id =$1";
			pool.query(deleteQuery, [taskid], (error, result) => {
				if (error) {
					return res.status(500).send({ msg: "Database ERROR" });
				}
				res.send({ msg: "data deleted" });
			});
		}
	} else {
		res.send("not authenticated");
	}
});

//let sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/email", (req, res) => {
	let email = req.body.email;
	let id;

	pool
		.query("select * from users where email=$1", [email])
		.then((result) => {
			id = result.rows[0].id;
			if (id) {
				const text = `reset_password/${id}`;
				sgMail.setApiKey(process.env.SENDGRID_API_KEY);
				const msg = {
					to: email,
					from: "anzaazam.nw4@gmail.com",
					subject: "Please follow the instructions",
					text:
						"Replace reset_password/:id with " +
						text +
						" in the browser url click enter then write new password and click submit",
				};

				sgMail
					.send(msg)
					.then(() => {
						res.json("Email Sent!");
					})
					.catch((error) => {
						res.json(error.toString());
					});
			}
		})

		.catch();
});

////////
router.post("/reset_password/:id", (req, res) => {
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

	const token = req.params.id;
	const password = req.body.password;
	console.log(password);
	const salt = bcrypt.genSaltSync(10);
	const newpassword = bcrypt.hashSync(password, salt);

	let query;

	query = "select * from users where id=$1";

	pool
		.query(query, [token])
		.then((result) => {
			if (result.rows.length > 0) {
				query =
					"update users set password = $1 where id= $2 returning id,email,password";

				pool
					.query(query, [newpassword, token])
					.then((result) => {
						res.json(result.rows[0]);
					})
					.catch();
			}
		})
		.catch();
});
router.get("/", (req, res) => {
	res.send({ msg: "hello" });
});
// router.get("/", (req, res) => {
// 	const request = require("request");

// 	const code = req.query.code;
// 	//console.log(code);
// if(code){
// 	const clientId = "2977670222342.2984355485058";
// 	const clientSecret = "217eabca6dc7e55c1625adfab7ade127";

// 	let path_to_access_token =
// 		"https://slack.com/api/oauth.v2.access?" +
// 		"client_id=" +
// 		clientId +
// 		"&" +
// 		"client_secret=" +
// 		clientSecret +
// 		"&" +
// 		"code=" +
// 		code +
// 		"&" +
// 		"redirect_uri=" +
// 		"https://ba75-2-222-102-147.ngrok.io/api/"; //Slack URL to call to receive accessToken
// 	//console.log(clientId,secretId,path_to_access_token)

// 	request(path_to_access_token, function (error, response, body) {
// 		// Request token from Slack using the access_code, then handle response

// 		let teamInfo = JSON.parse(body);
// 		//console.log(teamInfo);
// 		// Read a token from the environment variables

// 		const { WebClient, ErrorCode } = require("@slack/web-api");
// 		const web = new WebClient(teamInfo["authed_user"]["access_token"]);
// 		let userProfile;
// 		(async () => {
// 			try {
// 				// This method call should fail because we're giving it a bogus user ID to lookup.
// 				userProfile = await web.openid.connect.userInfo({
// 					user: teamInfo["authed_user"]["access_token"],
// 				});
// 			} catch (error) {
// 				// Check the code property, and when its a PlatformError, log the whole response.
// 				if (error.code === ErrorCode.PlatformError) {
// 					console.log(error.data);
// 				} else {
// 				}
// 			}
// 		}
// 		)().then(() => {
// 			//console.log(userProfile);

// 			//console.log(teamInfo); //Slack sends back access_code and team info in a JSON object

// 			let username;

// 			pool
// 				.query("select * from users where email= $1", [userProfile.email])
// 				.then((result) => {

// 					if (result.rowCount < 1) {
// 						res.redirect("http://localhost:3000/signup");
// 					} else {
// 						username = result.rows[0].username;
// 						const authtoken = createToken(result.rows[0].id);
//                         tokenarray.push(authtoken);
// 						//localStorage.setItem("token", authtoken); //if you are sending token.
// 						slacklogin["token"] = tokenarray[0];
// 						res.redirect(`http://localhost:3000/${username}`);
// 					}
// 				})
// 				.catch();
// 		}
// 		);
// 	});
// }
// });
export default router;
