export function validEmail(useremail) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail);
}

export function validUserName(username) {
	return username.length > 0;
}

export function validPassword(password) {
	return password.length > 0;
}

export function validSlackId(slackid) {
	const sLength = slackid.length;
	const validLength = sLength >= 9 && sLength <= 12;
	const startWithUorW = slackid[0] === "U" || slackid[0] === "W";
	const noLowerCase = !/[a-z]/.test(slackid) && /[A-Z]/.test(slackid);
	const includesNumber = /\d/.test(slackid);
	return validLength && startWithUorW && noLowerCase && includesNumber;
}

export function handleServerMessage(
	data,
	setUsernameMessage,
	setUsernameMessageDisplay,
	setEmailMessage,
	setEmailMessageDisplay,
	setSlackidMessage,
	setSlackidMessageDisplay
) {
	if (data.message === "An account with this username already exists") {
		setUsernameMessage(data.message);
		setUsernameMessageDisplay(true);
	} else if (data.message === "An account with this email already exists") {
		setEmailMessage(data.message);
		setUsernameMessageDisplay(false);
		setEmailMessageDisplay(true);
	} else if (data.message === "An account with this slackid already exists") {
		setSlackidMessage(data.message);
		setUsernameMessageDisplay(false);
		setEmailMessageDisplay(false);
		setSlackidMessageDisplay(true);
	} else {
		setUsernameMessageDisplay(false);
		setEmailMessageDisplay(false);
		setSlackidMessageDisplay(false);
	}
}
