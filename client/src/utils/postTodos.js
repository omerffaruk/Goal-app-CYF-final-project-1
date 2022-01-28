import fetchData from "./fetchData";
export default async function postTodos(todayTasks, setIsSubmitting) {
	const todayTasksNew = todayTasks
		.filter((task) => task.task !== "")
		.map((task) => task.task);

	//get token
	const token = localStorage.getItem("t");

	//Prepare postObject
	const postObject = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			authorization: token, // ADD Token to HEADER
		},
		body: JSON.stringify({ todayTasksNew }),
	};

	fetchData("/newtasks", postObject).then((response) => {
		if (response.status === 200) {
			setTimeout(() => setIsSubmitting(false), 250);
		}
	});
}
