var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function(app) {

	app.get('/partials/*', function (req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', function (req, res, next) {
		var auth = passport.authenticate('local', function (err, user) {
			if(err) { return next(err); }
			if(!user) { res.send({success: false}); }
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				res.send({success: true, user: user});
			});
		});
		auth(req, res, next);
	});

	app.get('*', function(req, res) {
		var User = mongoose.model('User');
		var firstName = 'nope';
		User.findOne({username: 'pcunliffe'}).exec(function (err, user) {
			if(user) {
				firstName = user.firstName;
			} else {
				firstName = err.toString();
			}
			res.render('index', {
				firstName: firstName
			});
		});
		
	});
}