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
		form: String,
		Date: String,
		address: String,
		phone:String
	},
	price: {
		type: Number,
		default:null
	},
	status:{
		type:String
		//pending, approved, preparing, disapproved, cancelled, delivered
	}
	// userApproval:{
	// 	type: Boolean,
	// 	default:false
	// },
	// pharmacyApproval:{
	// 	type: Boolean,
	// 	default:false
	// },
	// pharmacyRespond:{
	// 	type: Boolean,
	// 	default:false
	// },
	// userRespond:{
	// 	type: Boolean,
	// 	default:false
	// },
	// delivered :{
	// 	type: Boolean,
	// 	default:false
	// }
});

const Order = mongoose.model("Order", order_schema);

module.exports = Order;
