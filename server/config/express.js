var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	sassMiddleware = require('node-sass-middleware'),
	cookieParser = require('cookie-parser'),
	session = require('express-session')
	passport = require('passport');

module.exports = function(app, config) {

	function compile(str, path) {
		return stylus(str).set('filename', path);
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser());
	app.use(session({secret: 'umami narwhals', resave:false, saveUninitialized:false}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(sassMiddleware(
		{
			src: config.rootPath + '/public',
			outputStyle: 'compressed',
			debug: true
		}
	));
	app.use(express.static(config.rootPath + '/public'));
};

