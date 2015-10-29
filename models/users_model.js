var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {type: String, unique: true},
	email: String,
	color: String,
	hash_password: String
});
module.exports = mongoose.model('User', UserSchema);