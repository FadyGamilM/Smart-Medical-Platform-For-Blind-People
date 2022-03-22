const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");

// exports.rateDoctor = async (req, res, next) =>{
//     try {
//         const doctorId = req.body.id;
//         const newRating = req.body.rating;
//         //console.log("newrating=",newRating);
//         //console.log(typeof newRating);
//         const doctor = await Doctor.findById({_id:doctorId},{rate:1, rate_count:1});
//         const oldRating = doctor.rate;
//         const ratingCount = doctor.rate_count;
//         //console.log("oldRating",oldRating);
//         //console.log("ratingCount",ratingCount);
//         //((old Rating * Rating count) + new Rating) / (Rating count + 1)
//         const newRate = ((oldRating * ratingCount) + newRating) / (ratingCount + 1);
//         //console.log("newRate",newRate);
//         //console.log(typeof newRate);
//         const updated = await Doctor.updateOne({_id:doctorId},{ $set: { "rate" : newRate }, $inc: { "rate_count": 1 } });
//         // const updated = await Doctor.findByIdAndUpdate( 
//         // {_id:doctorId},
//         // {$set: { "rate" : ((this.rate * this.rate_count) + newRating) / (this.rate_count + 1) }, $inc: { "rate_count": 1 }}
//         // );
    
//         if(updated.matchedCount==1 && updated.modifiedCount==1){
//             return res.status(200).json("successfull rating");
//         }
//         else{
//             res.status(400).json("couldn't update");
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error.message);
//     }
// };

exports.getDoctorsOfEntity = async (req, res, next) => {
    try {
        const entityName = req.params.entity;
        const entity = await Entity.findOne({name:entityName});
        if(entity){
            const doctors = await Doctor.find({entity_id:entity._id},{
                _id:0,
                password:0,
                gender:0,
                patients:0,
                meetings:0,
                entity_id:0
            });
            if(doctors.length != 0){
                return res.status(200).json(doctors);
            }
            else{
                return res.status(200).json("this entity has no doctors right now");
            }
        }
        else{
            return res.status(400).json("no entity found with this name");
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};

exports.setTimeTable = async (req, res, next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "doctor"){
            //push to timetable array the new time
            //{$push: {friends: {firstName: "Harry", lastName: "Potter"}}}
            const updated = await Doctor.updateOne({_id},{
                $push:{timetable:{
                    day:req.body.day,
			        from:req.body.from,
			        to:req.body.to
                }}
            });
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("timetable has been updated successfully");
            }
            else{
                res.status(400).json("couldn't update");
            }
            //res.status(200).json("timetable has been updated successfully"); 
        }
        else{
           res.status(401).json("not authorized, doctor action only"); 
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
}
// exports.addReview = async (req, res, next) => {
//     try {
//         //todo: add review to certain doctor by his id
//         const doctorId = req.body.id;
//         const doctor = await Doctor.findById({_id:doctorId},{rate:1, rate_count:1});

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error.message);
//     }
// };

// exports.getReview = async (req, res, next) => {
//     try {
//         //todo: get review of certain doctor by his id
//         const doctorId = req.body.id;
//         const doctor = await Doctor.findById({_id:doctorId},{rate:1, rate_count:1});

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json(error.message);
//     }
// };
