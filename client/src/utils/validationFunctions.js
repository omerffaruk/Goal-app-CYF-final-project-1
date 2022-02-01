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