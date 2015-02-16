var mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.db, config.dbSettings);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
		console.log("umami DB opened");
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection ) {
		if(collection.length === 0) {
			User.create({firstName:'Phil', lastName:'Cunliffe', username: 'pcunliffe'});
			User.create({firstName:'Ray', lastName:'Ohmori', username: 'rohmori'});
			User.create({firstName:'Jimmy', lastName:'Cricket', username: 'jcricket'});
		}
	});

}