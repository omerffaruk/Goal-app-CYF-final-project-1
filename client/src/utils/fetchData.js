export default async function fetchData(
	endPoint,
	methodObj = { method: "GET" }
) {
	const response = await fetch(
		`https://goal-app-cyf-final-project.herokuapp.com/api${endPoint}`,
		methodObj
	);
	return response;
}
