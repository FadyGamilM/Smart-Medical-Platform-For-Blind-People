// // import models
// const {Meeting} = require("../models/Meeting");

// const Doctor = require("../models/Doctor");
// const Meeting = require("../models/Meeting");

// exports.changeStatus = async(req, res, next) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

// exports.editMeetingPrice = async (req, res, next) => {
//     try {
//             const price = req.body.price;
//             const doc = await Doctor.findOne({_id:req.body.id},{meeting_price:1})
//             const updated = await Meeting.updateMany({doctor:req.body.id},{price:doc.meeting_price});
//             if(updated.matchedCount==updated.modifiedCount){
//                 return res.status(200).json("price has been updated successfully");
//             }
//             else{
//                 res.status(400).json("no change");
//             }
            
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

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