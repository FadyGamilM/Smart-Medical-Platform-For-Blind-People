const mongoose = require("mongoose");

const meeting_schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
	},
	Date:String,
	day:String,
	slot:String,
	meeting_link: String,
	status:String
});

const Meeting = mongoose.model("Meeting", meeting_schema);

module.exports = Meeting;
