const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
	},
	profilePic: {
		type: String,
	},
	meetings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Meeting",
		},
	],
	history: {
		disease: [String],
		prescreption: {
			type: String,
		},
	},
	googleId: {
		type: String,
	},
});

const User = mongoose.model("User", user_schema);

module.exports = User;
