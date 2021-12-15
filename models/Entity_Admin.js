const mongoose = require("mongoose");

const entity_admin_schema = new mongoose.Schema({
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
	}
});

const Entity_Admin = mongoose.model("Entity_Admin", entity_admin_schema);

module.exports = Entity_Admin;
