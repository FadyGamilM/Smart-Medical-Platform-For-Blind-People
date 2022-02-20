// // import models
// const {Meeting} = require("../models/Meeting");

// exports.createMeeting = async (req, res, next) => {
// 	try {
//         const meeting = await Meeting.create({
//             user:req.body.user_id,
//             doctor:req.body.doctor_id,
//             Date:Date.now(),
//             meeting_link:req.body.meeting_link
//         }).populate("user","doctor");
        
//        const returns = { "user":meeting.user.username,
//                     "doctor":meeting.doctor.username,
//                     "date":meeting.Date,
//                     "meeting_link":meeting.meeting_link
//         }
//         return res.status(200).json(returns);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };