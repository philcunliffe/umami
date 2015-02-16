var path = require('path');
var rootPath =  path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://ds045998.mongolab.com:45998/umami',
		dbSettings: {
			user: 'umamiAdmin',
			pass: 'passw0rd'
		},
		rootPath: rootPath,
		port: process.env.PORT || 8000
	},
	production: {
		db : 'fill this in with prod DB',
		dbSettings: {
			user: 'umamiAdmin',
			pass: 'passw0rd'
		},
		rootPath: rootPath,
		port: process.env.PORT || 80
	}
};