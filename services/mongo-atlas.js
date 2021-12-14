//! require mongoose module for connection
const mongoose = require("mongoose");

//! require dotenv for environment variables
const dotenv = require("dotenv").config();

//! require colors for development purpose
const colors = require("colors");

//! Important options for database connections
const DB_options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//! Get the URI of database for connection
const DB_URI = process.env.DB_URI;

//! Establish the connection
const DB_Conn = mongoose
	.connect(DB_URI, DB_options)
	.then(() => {
		console.log(
			`Server is connected to mongodb atlas successfully`.yellow.inverse
		);
	})
	.catch((err) => {
		console.log(`${err}`.red.inverse);
	});

//! Export database connection for server entry point
module.exports = DB_Conn;
