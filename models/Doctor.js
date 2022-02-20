const mongoose = require("mongoose");
const Meeting = require("./Meeting");
const Entity = require("./Entity");
const bcrypt = require("bcrypt");

const doctor_schema = new mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
	},
	patients: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	profilePic: {
		type: String,
	},
	meetings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Meeting",
		},
	],
	specialization: {
		type: String,
	},
	bio: {
		description: String,
	},
	timetable: [
		{
			type: Date,
		},
	],
	rate: {
		type: Number,
	},
	entity_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Entity",
	},
});
//fire a function before saving document to db
doctor_schema.pre('save', async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//function to compare between the saved hashed password and the password which entered at login process
doctor_schema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		// its not a middleware so we can't say next(error)
		throw error;
	}
};

//static method to login users 
doctor_schema.statics.log = async function(email,pass) {
	const doctor = await this.findOne({email});
	if(doctor){
		const auth = await bcrypt.compare(pass,doctor.password);
		if(auth) {
			return doctor;
		}
		throw Error("incorrect password")
	}
	throw Error("incorrect email")
};
 
const Doctor = mongoose.model("Doctor", doctor_schema);

module.exports = Doctor;
//exports.Doctor = mongoose.model("Doctor", doctor_schema);
