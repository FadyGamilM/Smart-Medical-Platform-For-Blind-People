const mongoose = require("mongoose");

const pharmacy_schema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Entity_Admin",
	},
	name:{
		type: String,
		required: true,
		unique: true
	},
	arabic_name: {
		type: String,
		required: true,
		unique: true
	},
	address: [String],
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	},
	hero_photo: [String],
	icon: String,
	telephone: [String],
	active:{
		type:Boolean,
		default:true
	}
	// orders: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Orders",
	// 	},
	// ],
});

const Pharmacy = mongoose.model("Pharmacy", pharmacy_schema);

module.exports = Pharmacy;
//exports.Pharmacy = mongoose.model("Pharmacy", pharmacy_schema);
