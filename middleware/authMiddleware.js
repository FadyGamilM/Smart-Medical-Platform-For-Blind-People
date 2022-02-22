const User = require("../models/User");
const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
	try {
		let token;
		//! get the token
		let authorization_headers = req.headers.authorization;
		authorization_headers = authorization_headers.split(" ");
		if (authorization_headers[0] === "Bearer") {
			if (authorization_headers[1]) {
				token = authorization_headers[1];
			} else {
				return res.status(401).json("not authorized, no token is sent");
			}
		} else {
			return res.status(401).json("not authorized, no token is sent");
		}
		//! decode the token
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		//! attach the whole user document into request to be availiable into next middleware handler
		//const  = decoded.userID;
		req.id = decoded.userID;
		req.type = decoded.type

		//req.user = await User.findById(decoded.userID);

		next();
	} catch (error) {
		console.log(error)
		return res.status(401).json("not authorized, token is failed");
	}
};

//module.exports = protect;