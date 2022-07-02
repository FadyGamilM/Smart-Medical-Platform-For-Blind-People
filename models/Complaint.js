const mongoose = require("mongoose");

const complaint_schema = new mongoose.Schema({

    complaint:{
        form: String,
        contact_number:String,
        contact_mail:String,
        issuedAt:Date
    },
    owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	}
    // contact_number:{
    //     type:String
    // },
    // contact_mail:{
    //     type:String
    // },
    // issuedAt:{
    //     type: Date
    // },
});

const Complaint = mongoose.model("Complaint", complaint_schema);

module.exports = Complaint;