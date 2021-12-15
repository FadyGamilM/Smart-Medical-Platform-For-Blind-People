const mongoose = require("mongoose");

const entity_schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    icon: {
        type: String,
        default: ""
    },
    address: [String],
	telephone: [String],
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Entity_Admin",
	},
    flag:{
        type: String
    }

});

exports.Entity = mongoose.model("Entity", entity_schema);
