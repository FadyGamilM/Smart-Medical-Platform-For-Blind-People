//hospital and clinic admins

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const entity_admin_schema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 8
	},
	profilePic: {
		type: String,
	},
	gender: {
		type: String,
		enum: ["Male", "Female"]
	},
	role: {
		type: String,
		enum:['owner', 'c_admin', 'h_admin', 'p_admin'],
	}
});
//fire a function before saving document to db
entity_admin_schema.pre('save', async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//function to compare between the saved hashed password and the password which entered at login process
entity_admin_schema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		// its not a middleware so we can't say next(error)
		throw error;
	}
};

//static method to login users 
entity_admin_schema.statics.log = async function(email,pass) {
	const admin = await this.findOne({email});
	if(admin){
		const auth = await bcrypt.compare(pass,admin.password);
		if(auth) {
			return admin;
		}
		throw Error("incorrect password")
	}
	throw Error("incorrect email")
};
 
const Entity_Admin = mongoose.model("Entity_Admin", entity_admin_schema);

module.exports = Entity_Admin;
