const mongoose = require("mongoose");

const clinic_admin_schema = new mongoose.Schema({
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
	clinic: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clinic",
	},
});

const Clinic_Admin = mongoose.model("Clinic_Admin", clinic_admin_schema);

module.exports = Clinic_Admin;
