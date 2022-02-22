const mongoose = require("mongoose");

const announcement_schema = new mongoose.Schema({

    announce:{
        type: String
    },
    issuedAt:{
        type: Date
    },
    owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Entity_Admin",
	},
});