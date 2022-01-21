import fetchData from "./fetchData";
export default function getUserTasks(endpoint, setState) {
	fetchData(endpoint, {
		method: "GET",
		headers: { authorization: localStorage.getItem("t") },
	})
		.then((res) => {
			return res.status !== 404 ? res.json() : { user: [] };
		})
		.then((data) => {
			setState(data.user);
		})
		.catch((error) => {
			console.log("UserTaskError", error);
		});
}
