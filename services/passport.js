// //TODO  => import passport 3rd party libraries
// //! require passport library
// const passport = require("passport");
// //! require passport strategy for the specific provider we will use (which is google provider here)
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// //TODO => import keys (public/private) tokens for passport strategies supported by our app
// require("dotenv").config();
// const keys = require("../config/keys");

// //TODO=> require User model so we can deal with users collection at callback function of auth which is executed whenever the user is returned back from google server to our server
// const { User } = require("../models/User");

// //TODO => Setup the passport strategy
// //! define the serialization method which recieve the user that just registered or logged-in and generate a cookie for this user
// // user is the user document that passed from done() method
// passport.serializeUser((user, done) => {
// 	/**
// 	 //* you might asking why iam using the mongodb _id here and not the profile.id that generated from Google strategy (the id of the gmail account of this user)
// 	 //* ==> The answer is that we might later have more than one strategy for our users to use to sign-in, so we don't have to specify that the peice of info that we will use
// 	 //* 			to generate the token is the id from google or facebook or .... strategy,
// 	 //*			So, we have to use something generic such as mongodb _id  
// 	 */
// 	done(null, user.id);
// });

// //! define the de-serialization method which receive the cookie and get the user corresponding to this cookie
// passport.deserializeUser(async (id, done) => {
// 	// search in all records of our User collection
// 	const user = await User.findById(id);
// 	console.log("deserialization: ", user);
// 	done(null, user);
// });

// //! tell passport to use this available provider strategy (passport google strategy)
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.googleClientID,
// 			clientSecret: process.env.googleClientSecret,
// 			callbackURL: "/auth/google/callback",
// 		},
// 		//* when user clicks on his account, this arrow function will be executed
// 		//* and using this function we can exchange the info of this user with the code (done automatically by the 2nd setuped route "/auth/google/callback" )
// 		//* and here we can get benefites of this and store our user to database
// 		async (accessToken, refreshToken, profile, done) => {
// 			try {
// 				console.log(profile);
// 				// (1) find the email_id that fetched from Google server to this user
// 				const google_id = profile.id;
// 				// (2) check if this user is registered to our application with this email before or this is the first time
// 				const registeredBefore = await User.findOne({ googleId: google_id });
// 				if (registeredBefore) {
// 					console.log("user id is ", registeredBefore.id);
// 					// (3)' so we don't need to create a new record for this user in User model because its the signing-in time for this user
// 					return done(null, registeredBefore);
// 				} else {
// 					// (3)'' create a new record for this new user at User model because this is the registeration time for this user
// 					const user = await User.create({
// 						googleId: profile.id,
// 					});
// 					// call done() to complete the auth flow
// 					return done(null, user);
// 				}
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		}
// 	)
// );
