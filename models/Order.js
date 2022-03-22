const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
	pharmacy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Pharmacy",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	order_data: {
		medecins: [String],
		Date: Date,
		address: String,
	},
	price: {
		type: Number,
		default:null
	},
	userApproval:{
		type: Boolean,
		default:false
	},
	pharmacyApproval:{
		type: Boolean,
		default:false
	},
	delivered :{
		type: Boolean,
		default:false
	}
});

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
