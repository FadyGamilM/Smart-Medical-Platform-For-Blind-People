// // import DOCTOR model to deal with database
// const { Doctor } = require("../models/Doctor");

// // @ route handler for  [ GET /home ]
// exports.getHighlyRatedDoctors = async (req, res, next) => {
// 	try {
// 		// (1) fetch all required info about doctors
// 		// NOTE, i am not gonna fetch the whole document, only the required fields we need for home page and the _id will be fetched by default so if they clicked on any doctor card they can access his/her _id
// 		// this is called projection in mongodb DB
// 		let doctors = await Doctor.find(
// 			{
// 				rate: {
// 					$gte: 4,
// 				},
// 			},
// 			{
// 				username: 1,
// 				profilePic: 1,
// 				specialization: 1,
// 				rate: 1,
// 				entity_id: 1,
// 			}
// 		).populate("entity_id");
// 		// (2) return the response to client
// 		return res.status(200).json(doctors);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };
