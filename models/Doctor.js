const mongoose = require("mongoose");

const doctor_schema = new mongoose.Schema({
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
	patients: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	profilePic: {
		type: String,
	},
	meetings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Meeting",
		},
	],
	specialization: {
		type: String,
	},
	bio: {
		description: String,
		timetable: [new Date()],
	},
	rate: {
		type: Number,
	},
	entity_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		refPath: "onModel",
	},
	onModel: {
		type: String,
		required: true,
		enum: ["Pharmacy", "Clinic", "Hospital"],
	},
});

const Doctor = mongoose.model("Doctor", doctor_schema);

module.exports = Doctor;
