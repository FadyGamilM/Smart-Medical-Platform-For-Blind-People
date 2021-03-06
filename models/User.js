const mongoose = require("mongoose");
const Meeting = require("./Meeting");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");

const user_schema = new mongoose.Schema({
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
	profilePic: {
		type: String,
		default:""
	},
	// meetings: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Meeting",
	// 	},
	// ],
	history: {
		surgeries:{
			type:String,
			default:""},
		diseases :{
			type:String,
			default:""},
		family_history :{
			type:String,
			default:""},
		medications :{
			type:String,
			default:""},
	},
	// googleId: {
	// 	type: String,
	// },
	dateOfBirth:{
		type:Date
		//type: String,
		//default:""
	},
	age:{
		type:Number
	    //{ $dateDiff: { startDate: "$dateOfBirth", endDate: "$$NOW", unit: "year" } } }
	},
	blood:{
		type: String,
		default: ""
	},
	address:{
		type:String,
		default:""
	},
	phone:{
		type:String,
		default:""
	},
	face:{
		type:Boolean,
		default:false
	}
});
//fire a function before saving document to db
user_schema.pre('save', async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	// /// to set age of user
	// if(this.dateOfBirth){
	// 	const dateArr= this.dateOfBirth.split("/")
	// 	const year=parseInt(dateArr[2])
	// 	const d = new Date();
	// 	const current_year = d.getFullYear()
	// 	this.age = current_year - year;
	// }
	next();
});

//function to compare between the saved hashed password and the password which entered at login process
user_schema.methods.isValidPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		// its not a middleware so we can't say next(error)
		throw error;
	}
};

//static method to login users 
user_schema.statics.log = async function(email,password) {
		const user = await this.findOne({email});
		//.populate({path: "meetings",select:{_id:0,doctor:1,Date:1,day:1,slot:1,meeting_link:1,status:1},populate:{path:"doctor",select:{_id:0,username:1,email:1}}});
		if(user){
			const auth = await bcrypt.compare(password,user.password);
			if(auth) {
				return user;
			}
			//return res.status(400).json("incorrect password");
			//return("incorrect password");
			throw Error("incorrect password")
		}
		//return res.status(400).json("incorrect email");
		throw Error("incorrect email")
};
 
const User = mongoose.model("User", user_schema);

module.exports = User;
