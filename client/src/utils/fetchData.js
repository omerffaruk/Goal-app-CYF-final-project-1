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

// Heroku api url: https://goal-app-cyf-final-project.herokuapp.com/api
// Local host url: http://127.0.0.1:3100/api