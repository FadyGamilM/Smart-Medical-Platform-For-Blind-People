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
	},
	userApproval: Boolean,
	pharmacyApproval: Boolean,
	delivered :Boolean
});

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
