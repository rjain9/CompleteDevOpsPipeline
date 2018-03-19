var mongoose = require('mongoose');

var studySchema = new mongoose.Schema({
	_id: new mongoose.Types.ObjectId,
	name: String,
	description: String,
	studyKind: String,
	researcherName: String,
	contact: String,
	awards: String,
	awardOptions: [
		{type: String}
	],
	status: String,
	goal: Number,
	invitecode: String,
	markdown: String,
	token: String,
	adminLink: String,
	publicLink: String
});

module.exports.studySchema = studySchema;