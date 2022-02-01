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
		const viewItems = standUpViewItems(yesterdayEvents, todayEvents);
		const result = await client.views.open({
			trigger_id: shortcut.trigger_id,
			view: viewItems,
		});
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
	const allTodosOfYesterday = view.blocks[1].element.options; // If you add new block, change index number
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
	let isError = false;
	try {
		const yesterdaysCompletedTasksSetQuery =
			"UPDATE todo SET iscomplete = true WHERE id = ANY ($1)";
		await pool.query(yesterdaysCompletedTasksSetQuery, [
			complatedTodosOfYesterday,
		]);
		const yesterdaysUnCompletedTasksSetQuery =
			"UPDATE todo SET iscomplete = false WHERE id =ANY ($1)";
		await pool.query(yesterdaysUnCompletedTasksSetQuery, [
			unComplatedTodosOfYesterday,
		]);

		//find todays todos, delete all of them and add new ones
		const deleteTodayTodosQuery = `DELETE FROM todo WHERE id IN (SELECT todo.id
		FROM users
		INNER JOIN todo ON users.id = todo.user_id
		WHERE slackid = $1 AND
		date >= TIMESTAMP 'today' AND
		date <  TIMESTAMP 'tomorrow') returning user_id `;
		let poolResponse = await pool.query(deleteTodayTodosQuery, [body.user.id]);
		const user_table_id = await pool.query(
			"SELECT id FROM users WHERE slackid=$1",
			[body.user.id]
		);

		let addTodayValuesQuery = "";
		addTodayValuesQuery = todaysToDos.map((todo) => `($$${todo}$$,false,$1)`);

		if (poolResponse) {
			const taskUserId = user_table_id.rows[0].id;
			await pool.query(
				`INSERT INTO todo(task,isComplete,user_id) VALUES ${addTodayValuesQuery.join(
					","
				)}`,
				[taskUserId]
			);
		}
	} catch (error) {
		isError = true;
	}
	if (!isError) {
		// DB save was successful
		msg = `*Summary of submission...*\n *yesterday* you complated *${complatedTodosOfYesterday.length}* items\n*Today, your tasks are;*\n`;

		todaysToDos.forEach((task) => {
			msg += `- _${task}_\n`;
		});
		msg += `\nThank you <@${body.user.id}> your submission was successful`;
	} else {
		msg =
			"OOPS 😳 !!!\nThere is an *error* with your submission, please contact with your mentor... \n You can continue <https://goal-app-cyf-final-project.herokuapp.com/|*_with website_*> ";
	}

	// Message the user
	try {
		const result = await client.views.open({
			trigger_id: body.trigger_id,
			view: {
				type: "modal",
				title: {
					type: "plain_text",
					text: "Hey there,",
					emoji: true,
				},
				close: {
					type: "plain_text",
					text: "Close",
					emoji: true,
				},
				blocks: [
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: msg,
						},
					},
				],
			},
		});
	} catch (error) {
		logger.error({ error });
	}
});

// Listen for an event from the Events API
app.event("app_mention", async ({ say }) => {
	await say(":military_helmet: YES SIR!!! :military_helmet:");
});

app.message(/:cry:/g, async ({ message, say }) => {
	await say(
		`_Please smile <@${message.user}> :smile: There is always a reason to simile_`
	);
});

app.message("knock knock", async ({ say }) => {
	await say("_Who's there?_");
});

export { receiver };
