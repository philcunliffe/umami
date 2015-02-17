var sanitize = function (user) {
	var sanitizedUser = {
		id: user._id,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		roles: user.roles
	}

	return sanitizedUser;
}

exports.sanitize = sanitize;