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
	Date: new Date(),
	meeting_link: String,
});

const Meeting = mongoose.model("Meeting", meeting_schema);

module.exports = Meeting;
