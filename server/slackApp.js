import { createApp } from "./utils/slackAppCreate";
import router from "./api";
import standUpViewItems from "./utils/standUpViewItems";
const { app, receiver } = createApp("slack"); //function won't use the name
import pool from "./utils/pool";
receiver.router.use("/api", router); //if request path is https//..../api check go api for express

//SHORTCUT
//ADD command permission
app.shortcut("lunch_daily_brief", async ({ body, shortcut, ack, client }) => {
	try {
		// Acknowledge the action
		await ack();
		//DB connection

		const slackid = await body.user.id;
		//check the slackid
		const yesterdaysTasksSelectQuery = `SELECT todo.id as taskid, users.username, users.id as userid,users.slackid as slackid, users.role, users.email, todo.task, todo.date, todo.iscomplete
                                        FROM users
                                        INNER JOIN todo ON users.id = todo.user_id
                                        WHERE slackid = $1 AND
                                                date >= TIMESTAMP 'yesterday' AND
                                                date <  TIMESTAMP 'today'`;
		const todaysTasksSelectQuery = `SELECT todo.id as taskid, users.username, users.id as userid,users.slackid as slackid, users.role, users.email, todo.task, todo.date, todo.iscomplete
                                        FROM users
                                        INNER JOIN todo ON users.id = todo.user_id
                                        WHERE slackid = $1 AND
                                                date >= TIMESTAMP 'today' AND
                                                date <  TIMESTAMP 'tomorrow'`;

		const poolResponseForYesterday = await pool.query(
			yesterdaysTasksSelectQuery,
			[slackid]
		);
		const poolResponseForToday = await pool.query(todaysTasksSelectQuery, [
			slackid,
		]);
		const yesterdayEvents = poolResponseForYesterday.rows;
		const todayEvents = poolResponseForToday.rows;
		// console.log({ yesterdayEvents, todayEvents });
		const viewItems = standUpViewItems(yesterdayEvents, todayEvents);
		const result = await client.views.open({
			trigger_id: shortcut.trigger_id,
			view: viewItems,
		});
		// console.log(result);//later you can send message
	} catch (error) {
		console.log(error);
	}
});

// Listen for view_submission modal events
// Handle a view_submission request
app.view("standup_callback_id", async ({ ack, body, view, client, logger }) => {
	// Acknowledge the view_submission request
	await ack();
	// Do whatever you want with the input data - here we're saving it to a DB then sending the user a verifcation of their submission

	// array of checked object
	const complatedTodosOfYesterday = view.state.values[
		"yesterday_input_container"
	]["checkboxes-action"].selected_options.map((todo) => +todo.value);
	const allTodosOfYesterday = view.blocks[0].element.options;
	const unComplatedTodosOfYesterday = allTodosOfYesterday
		.map((todo) => +todo.value)
		.filter((todo) => !complatedTodosOfYesterday.includes(todo));
	//array of input area texts(if there is 2 enter for next line it will be empty, handle it later)
	const todaysToDos = view.state.values["today_input_container_big"][
		"plain_text_input-action"
	].value
		.split("\n")
		.filter((item) => item);
	// // Message to send user
	let msg = "";
	// // Save to DB
	// find yesterday todaysToDos, and if  complatedTodosOfYesterday, change to the true
	const yesterdaysCompletedTasksSetQuery = `UPDATE todo SET iscomplete = true WHERE id =ANY ($1)`;
	const response0 = await pool.query(yesterdaysCompletedTasksSetQuery, [
		complatedTodosOfYesterday,
	]);
	const yesterdaysUnCompletedTasksSetQuery = `UPDATE todo SET iscomplete = false WHERE id =ANY ($1)`;
	const response1 = await pool.query(yesterdaysUnCompletedTasksSetQuery, [
		unComplatedTodosOfYesterday,
	]);

	//find todays todos, delete all of them and add new ones
	const deleteTodayTodosQuery = `DELETE FROM todo WHERE id IN (SELECT todo.id
		FROM users
		INNER JOIN todo ON users.id = todo.user_id
		WHERE slackid = $1 AND
		date >= TIMESTAMP 'today' AND
		date <  TIMESTAMP 'tomorrow') returning user_id `;
	const response3 = await pool.query(deleteTodayTodosQuery, [body.user.id]);
	const user_table_id = await pool.query(
		"SELECT id FROM users WHERE slackid=$1",
		[body.user.id]
	);

	let addTodayValuesQuery = "";
	addTodayValuesQuery = todaysToDos.map((todo) => `($$${todo}$$,false,$1)`);

	if (response3) {
		const taskUserId = user_table_id.rows[0].id;
		const addTodayTodosQuery = await pool.query(
			`INSERT INTO todo(task,isComplete,user_id) VALUES ${addTodayValuesQuery.join(
				","
			)}`,
			[taskUserId]
		);
	}
	if (true) {
		// DB save was successful

		msg = `Summary\n yesterday you complated ${complatedTodosOfYesterday.length} items\nToday, your tasks are;\n`;

		todaysToDos.forEach((task) => {
			msg += `- ${task}\n`;
		});
		msg += `Thank you <@${body.user.id}> your submission was successful`;
	} else {
		msg = "There was an error with your submission";
	}

	// Message the user
	try {
		await client.chat.postMessage({
			channel: body.user.id,
			text: msg,
		});
	} catch (error) {
		logger.error({ error });
	}
});

// Listen for an event from the Events API
app.event("app_mention", async ({ message, say }) => {
	await say(":military_helmet: YES SIR!!! :military_helmet:");
});

// Listens for messages containing "knock knock" and responds with an italicized "who's there?"
app.message(/:cry:/g, async ({ message, say }) => {
	console.log(message);
	await say(
		`_Please smile <@${message.user}> :smile: There is always a reason to simile_`
	);
});
app.message("knock knock", async ({ message, say }) => {
	await say(`_Who's there?_`);
});

export { receiver };
