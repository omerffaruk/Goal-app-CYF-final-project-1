import fetchData from "./fetchData";
export default async function deleteTodo(taskid) {
	//get token
	const token = localStorage.getItem("t");
	//Prepare putObject
	const putObject = {
		method: "DELETE",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			authorization: token, // ADD Token to HEADER
		},
		body: JSON.stringify({ taskid }),
	};

	fetchData("/delete", putObject).then((response) => {
		response.status !== 200 && alert("OOOPS!!! something wrong");
		
	});
}
