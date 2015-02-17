var auth = require('./auth')
	sanitizeUser = require('./userSanitizer').sanitize;

module.exports = function(app) {

	app.get('/partials/*', function (req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function(req, res) {
		var userDto;
		if (!!req.user) {
			//Stripping out salt and password
			userDto = sanitizeUser(req.user);
		}
		res.render('index', {
			bootstrappedUser: userDto
		});
	});
}