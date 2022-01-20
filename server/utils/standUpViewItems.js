export default function standUpViewItems(yesterdayEvents, todayEvents = []) {
	// save comleted item if user complete from webApp
	const completedItems = [];
	const checboxOptions = yesterdayEvents.map((yesterdayEvent) => {
		//prepere checkboxes
		const item = {
			text: {
				type: "plain_text",
				text: yesterdayEvent.task,
				emoji: true,
			},
			value: `${yesterdayEvent.taskid}`,
		};
		if (yesterdayEvent.iscomplete) {
			completedItems.push(item);
		}
		return item;
	});

	//create checkboxes
	const elements = {
		type: "checkboxes",
		options: checboxOptions,
		action_id: "checkboxes-action",
	};
	if (yesterdayEvents.length === 0) {
		elements.options = [
			{
				text: {
					type: "plain_text",
					text: "YOU DONT HAVE ANY VALUE FOR  YESTERDAY",
					emoji: true,
				},
				value: `0`,
			},
		];
	}
	//add completed items if there is any
	if (completedItems.length > 0) {
		elements["initial_options"] = completedItems;
	}
	// if today items already there, show them
	const todaysItems =
		todayEvents.length > 0
			? todayEvents.map(({ task }) => task).join("\n")
			: "";

	//prepare modal payload
	const view = {
		type: "modal",
		callback_id: "standup_callback_id",
		title: {
			type: "plain_text",
			text: "Daily Stand up Meeting",
			emoji: true,
		},
		submit: {
			type: "plain_text",
			text: "Submit",
			emoji: true,
		},
		close: {
			type: "plain_text",
			text: "Cancel",
			emoji: true,
		},
		blocks: [
			{
				type: "input",
				optional: true,
				block_id: "yesterday_input_container",
				element: elements,
				label: {
					type: "plain_text",
					text: "Please select the ones you have completed from yesterday's tasks",
					emoji: true,
				},
			},
			{
				type: "divider",
			},
			{
				type: "input",
				block_id: "today_input_container_big",
				element: {
					type: "plain_text_input",
					multiline: true,
					initial_value: todaysItems,
					placeholder: {
						type: "plain_text",
						text: "Please enter your daily plan sepereted with line break ",
					},
					action_id: "plain_text_input-action",
				},
				label: {
					type: "plain_text",
					text: "Please enter today's tasks with line break...",
					emoji: true,
				},
			},
		],
	};
	return view;
}
