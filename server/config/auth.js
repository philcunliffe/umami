var passport = require('passport'),
	sanitizeUser = require('./userSanitizer').sanitize;

exports.authenticate = function (req, res, next) {
	var auth = passport.authenticate('local', function (err, user) {
		if(err) { return next(err); }
		if(!user) { res.send({success: false}); }
		req.logIn(user, function(err) {
			if (err) { return next(err); }
			res.send({success: true, user: sanitizeUser(user)});
		});
	});
	auth(req, res, next);
}