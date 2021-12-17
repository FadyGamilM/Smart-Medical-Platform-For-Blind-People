/*//TODO  => import passport 3rd party libraries
//! require passport library
const passport = require("passport");
//! require passport strategy for the specific provider we will use (which is google provider here)
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//TODO => import keys (public/private) tokens for passport strategies supported by our app
const Keys = require("../config/keys");

//TODO => Setup the passport strategy
// Client ID : 175343666428-bbb2jc11obhbovu8dm988hlnrjsnvpfk.apps.googleusercontent.com
// Client Secret : 
//! tell passport to use this available provider strategy (passport google strategy)
passport.use(
	new GoogleStrategy(
		{
			clientID: Keys.googleClientID,
			clientSecret: Keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
		},
		// when user clicks on his account, this arrow function will be executed
		// and using this function we can exchange the info of this user with the code (done automatically by the 2nd setuped route "/auth/google/callback" )
		// and here we can get benefites of this and store our user to database
		(accessToken, refreshToken, profile, done) => {
			console.log("accessToken : ", accessToken);
			console.log("refreshToken : ", refreshToken);
			console.log("profile : ", profile);
		}
	)
);
*/