const mongoose = require("mongoose");

const pharmacy_schema = new mongoose.Schema({
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Entity_Admin",
	},
	name:String,
	address: [String],
	hero_photo: [String],
	icon: String,
	telephone: [String],
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
