//! require router app to chain it to main express app at etnry point of program
const router = require("express").Router();

//! require passport library
const passport = require("passport");

//TODO => setup the route handler that will trigger the entire flow of passport when user access this specific route
router.get(
	"/auth/google",
	passport.authenticate("google", {
		// Scope specify to google what access we want to have on user, here we take access on user's profile and email address as well
		scope: ["profile", "email"],
	}),
	(req, res, next) => {
		console.log("Authentication is successfullly done");
	}
);

// TODO=> this route is for users when they click on they account to gurantee our access to thier google accounts, and then Google server will send them back to /api/auth/google/callback?code=SOME_CODE
router.get("/auth/google/callback", passport.authenticate("google"));

module.exports = router;
