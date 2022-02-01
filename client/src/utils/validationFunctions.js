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
    const validLength = slackid.length >=9 && slackid.length <= 12;
    const startWithUorW = slackid[0] === "U" || slackid[0] === "W";
    const noLowerCase = slackid.match(/[a-z]/g).length === 0;
    const includesNumber = slackid.match(/[^a-zA-Z]+/g).length > 0;
    return validLength && startWithUorW && noLowerCase && includesNumber;
}