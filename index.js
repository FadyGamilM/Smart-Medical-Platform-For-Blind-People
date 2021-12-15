//! import express
const express = require("express");

//! import passport configuration setup from /services/passport
require("./services/passport"); // we need to only execute this requrired file but we don't export anything from it

//! Configure and fire express app
const app = express();

//! use built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! import database connection service
require("./services/mongo-atlas");

//! require/import auth routes and chain these routes to main express app
const authRoutes = require("./routes/auth");
//! require/import home route and chain it to main express app
const homeRoutes = require("./routes/home");
//! require/import hospital routes and chain these routes to main express app
const hospitalRoutes = require("./routes/hospital");
//! import doctors routes and chain these routes to main express app
const doctorRoutes = require("./routes/doctor");

//! chain all routes to app
app.use(authRoutes);
app.use(homeRoutes);
app.use(doctorRoutes);
app.use(hospitalRoutes);

//! development env port = 5000 , production port = "From Azure"
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Express Server is running up on port ${PORT}`);
});
