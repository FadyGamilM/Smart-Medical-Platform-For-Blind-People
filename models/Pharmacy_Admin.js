const mongoose = require("mongoose");

const pharmacy_admin_schema = new mongoose.Schema({
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
	pharmacy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pharmacy",
	},
});

const Pharmacy_Admin = mongoose.model("Pharmacy_Admin", pharmacy_admin_schema);

module.exports = Pharmacy_Admin;
