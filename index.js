//! import express
const express = require("express");

//! import passport configuration setup from /services/passport
//require("./services/passport"); // we need to only execute this requrired file but we don't export anything from it

//! Configure and fire express app
const app = express();

//! use built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//! lets inform passport that we need to use cookie-base auth in our authentication flow
//const cookieSession = require("cookie-session");
//const passport = require("passport");
//! tell passport that we need to use cookies inside our flow to support it
// app.use(
// 	cookieSession({
// 		// expiration date
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 		// keys to encrypt our cookie
// 		keys: [process.env.cookieKey],
// 	})
// );
//app.use(passport.initialize());
//app.use(passport.session());

//! import database connection service
require("./services/mongo-atlas");

// cors
const cors = require('cors');

//! require/import auth routes and chain these routes to main express app
const authRoutes = require("./routes/auth");
//! require/import home route and chain it to main express app
const homeRoutes = require("./routes/home");
//! require/import hospital routes and chain these routes to main express app
const hospitalRoutes = require("./routes/hospital");
//! import doctors routes and chain these routes to main express app
const doctorRoutes = require("./routes/doctor");
//! import user routes and chain these routes to main express app
const userRoutes = require("./routes/user");
//! import profile routes and chain these routes to main express app
const profileRoutes = require("./routes/profile");
// //! import pharmacy routes and chain these routes to main express app
const pharmacyRoutes = require("./routes/pharmacy");
// //! import meeting routes and chain these routes to main express app
// const meetingRoutes = require("./routes/meeting");
//! import clinic routes and chain these routes to main express app
const clinicRoutes = require("./routes/clinic");
//! import meeting routes and chain these routes to main express app
const adminRoutes = require("./routes/admin");

//! chain all routes to app
app.use(cors({origin: "*"}));
app.use(authRoutes);
app.use(homeRoutes);
app.use(doctorRoutes);
app.use(hospitalRoutes);
app.use(clinicRoutes);
app.use(profileRoutes);
app.use(pharmacyRoutes);
// app.use(meetingRoutes);
app.use(adminRoutes);
app.use(userRoutes);

//! development env port = 5000 , production port = "From Azure"
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Express Server is running up on port ${PORT}`);
});
app.get('/',(req,res)=>{

    res.send("welcome to hompage");

});