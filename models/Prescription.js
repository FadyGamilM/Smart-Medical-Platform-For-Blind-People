const mongoose = require("mongoose");

const prescription_schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
	},
    medicines:[
        String
    ],
	Date:Date,
	
});

const Prescription = mongoose.model("Prescription", prescription_schema);

module.exports = Prescription;
