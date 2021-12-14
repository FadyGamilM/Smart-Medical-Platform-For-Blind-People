//! import express
const express = require("express");

//! import passport configuration setup from /services/passport
require("./services/passport"); // we need to only execute this requrired file but we don't export anything from it

//! Configure and fire express app
const app = express();

//! require/import auth routes and chain it to main express app
const authRoutes = require("./routes/auth");

//! chain all routes to app
app.use(authRoutes);

//! development env port = 5000 , production port = "From Azure"
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Express Server is running up on port ${PORT}`);
});
