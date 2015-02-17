var mongoose = require('mongoose'),
	crypto = require('crypto');

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
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]
	});
	userSchema.methods = {
		authenticate: function(passwordToMatch) {
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
		}
	}

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection ) {
		if(collection.length === 0) {
			var salt, hash;
			salt = createSalt();
			hash = hashPwd(salt, 'pcunliffe');
			User.create({firstName:'Phil', lastName:'Cunliffe', username: 'pcunliffe', salt: salt, hashed_pwd: hash, roles: ['admin']});
			salt = createSalt();
			hash = hashPwd(salt, 'rohmori');
			User.create({firstName:'Ray', lastName:'Ohmori', username: 'rohmori', salt: salt, hashed_pwd: hash, roles: []});
			salt = createSalt();
			hash = hashPwd(salt, 'jcricket');
			User.create({firstName:'Jimmy', lastName:'Cricket', username: 'jcricket', salt: salt, hashed_pwd: hash});
		}
	});

}

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function hashPwd (salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}