import fetchData from "./fetchData";
export default async function postTodos(todayTasks, setIsSubmitting) {
	//get token
	const token = localStorage.getItem("t");
	const todayTasksTrim = todayTasks.trim();
	//Prepare postObject
	const postObject = {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			authorization: token, // ADD Token to HEADER
		},
		body: JSON.stringify({ todayTasksTrim }),
	};

	const response = await fetchData("/newtask", postObject);
	if (response.status === 200) {
		const id = await response.json();
		setTimeout(() => setIsSubmitting(false), 250);
		return id;
	}
}
