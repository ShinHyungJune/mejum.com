export function getLocalUser() {
	const user = localStorage.getItem("user");

	if(!user)
		return null;
	
	return JSON.parse(user);
}

export function getLocalToken() {
	const token = localStorage.getItem("token");

	if(!token)
		return null;
	
	return JSON.parse(token);
}
