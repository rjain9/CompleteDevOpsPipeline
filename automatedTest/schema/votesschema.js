var mongoose = require('mongoose');

var votesSchema = new mongoose.Schema({
	_id: new mongoose.Types.ObjectId,
	studyId: new mongoose.Types.ObjectId,
	timestamp: new mongoose.Types.ObjectId,
	ip: String,
	fingerprint: String,
 	answers: String,
 	email: String,
 	contact: String
});

module.exports.votesSchema = votesSchema;