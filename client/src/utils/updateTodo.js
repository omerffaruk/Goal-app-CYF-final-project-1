import fetchData from "./fetchData";
export default async function updateTodo(beforePeriodTask) {
	//get token
	const token = localStorage.getItem("t");
	//Prepare putObject
	const putObject = {
		method: "PUT",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			authorization: token, // ADD Token to HEADER
		},
		body: JSON.stringify({ beforePeriodTask }),
	};

	fetchData("/update", putObject).then((response) => {
		response.status !== 200 && alert("OOOPS!!! something wrong");
		// console.log({ response });
	});
}
