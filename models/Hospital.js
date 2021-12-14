const mongoose = require("mongoose");

const hospital_schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hospital_Admin",
	},
});

exports.Hospital = mongoose.model("Hospital", hospital_schema);
