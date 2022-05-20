const mongoose = require("mongoose");

const entity_schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	arabic_name: {
		type: String,
		required: true,
		unique: true
	},
    icon: {
        type: String,
        default: ""
    },
    address: [String],
	latitude:{
		type:Number,
		default:0
	},
	longitude:{
		type:Number,
		default:0
	},
	telephone: [String],
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Entity_Admin",
	},
    flag:{
		type: String,
		enum:['H','C']
    },
	active:{
		type:Boolean,
		default:true
	}

});

const Entity = mongoose.model("Entity", entity_schema);

module.exports = Entity;
//exports.Entity = mongoose.model("Entity", entity_schema);
