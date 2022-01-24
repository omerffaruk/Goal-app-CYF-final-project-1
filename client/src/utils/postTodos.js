import fetchData from "./fetchData";
export default async function postTodos(yesterdayTasks, todayTasks) {
	const yesterdayCheckedTasksId = [];
	const yesterdayUncheckedTasksId = [];
	yesterdayTasks.forEach((task) => {
		task.iscomplete
			? yesterdayCheckedTasksId.push(task.id)
			: yesterdayUncheckedTasksId.push(task.id);
	});

	const todayTasksAlreadySaved = [];
	const todayTasksNew = [];
	todayTasks
		.filter((task) => task.task !== "")
		.forEach((task) => {
			//filter empty ones
			todayTasksNew.push(task.task); //later seperate
			if (task.user_id) {
				todayTasksAlreadySaved.push(task);
			} else {
				// todayTasksNew.push(task.task);//later seperate
			}
		});
	const submitData = {
		yesterdayCheckedTasksId,
		yesterdayUncheckedTasksId,
		todayTasksAlreadySaved,
		todayTasksNew,
	};
	//get token
	const token = localStorage.getItem("t");

	//Prepare postObject
	const postObject = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`, // ADD Token to HEADER
		},
		body: JSON.stringify(submitData),
	};

	fetchData("/newtasks", postObject).then((response) => {
		console.log({ response }, ">>>>>>>>HANDLE IT LATER");
	});
}
