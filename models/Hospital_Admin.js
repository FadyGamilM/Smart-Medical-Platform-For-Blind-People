const mongoose = require("mongoose");

const Hospital_admin_schema = new mongoose.Schema({
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
	hospital: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hospital",
	},
});

const Hospital_Admin = mongoose.model("Hospital_Admin", Hospital_admin_schema);

module.exports = Hospital_Admin;
