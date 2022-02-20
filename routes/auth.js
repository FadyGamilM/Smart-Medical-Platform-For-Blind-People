// //! require router app to chain it to main express app at etnry point of program
const router = require("express").Router();
const {login, registerUser, registerDoctor, registerHadmin, registerCadmin, registerPadmin, logout} = require("../controllers/auth");
// //! require passport library
// const passport = require("passport");

// //TODO => setup the route handler that will trigger the entire flow of passport when user access this specific route
// router.get(
// 	"/auth/google",
// 	passport.authenticate("google", {
// 		// Scope specify to google what access we want to have on user, here we take access on user's profile and email address as well
// 		scope: ["profile", "email"],
// 	}),
// 	(req, res, next) => {
// 		console.log("Authentication is successfullly done");
// 	}
// );

// // TODO=> this route is for users when they click on they account to gurantee our access to thier google accounts, and then Google server will send them back to /api/auth/google/callback?code=SOME_CODE
// router.get("/auth/google/callback", passport.authenticate("google"));

// router.get("/api/logout", (req, res, next) => {
// 	// passport also attach some functions to req as it attached before the user document .. we can use these function
// 	req.logout(); // it takes the cookie and kill this cookie
// 	return res.send(req.user); // lets improve that this user isn't defined anymore
// });

// router.get("/api/current_user", (req, res, next) => {
// 	return res.send(req.user);
// });




////////////////////////////////////////////////////////////////////////////
router.route("/registration/user").post(registerUser);
router.route("/registration/doctor").post(registerDoctor);
router.route("/registration/hospitalAdmin").post(registerHadmin);
router.route("/registration/clinicAdmin").post(registerCadmin);
router.route("/registration/pharmacyAdmin").post(registerPadmin);
router.route("/login").post(login);
//router.route("/logout").get(logout);

module.exports = router;