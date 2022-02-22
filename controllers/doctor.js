const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
// exports.RegisterNewDoctor = async (req, res, next) => {
// 	try {
// 		const doctor = await Doctor.create(req.body);
// 		return res.status(201).json(doctor);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };
exports.rateDoctor = async (req, res, next) =>{
    try {
        const doctorId = req.body.id;
        const newRating = req.body.rating;
        //console.log("newrating=",newRating);
        //console.log(typeof newRating);
        const doctor = await Doctor.findById({_id:doctorId},{rate:1, rate_count:1});
        const oldRating = doctor.rate;
        const ratingCount = doctor.rate_count;
        //console.log("oldRating",oldRating);
        //console.log("ratingCount",ratingCount);
        //((old Rating * Rating count) + new Rating) / (Rating count + 1)
        const newRate = ((oldRating * ratingCount) + newRating) / (ratingCount + 1);
        //console.log("newRate",newRate);
        //console.log(typeof newRate);
        const updated = await Doctor.updateOne({_id:doctorId},{ $set: { "rate" : newRate }, $inc: { "rate_count": 1 } });
        // const updated = await Doctor.findByIdAndUpdate( 
        // {_id:doctorId},
        // {$set: { "rate" : ((this.rate * this.rate_count) + newRating) / (this.rate_count + 1) }, $inc: { "rate_count": 1 }}
        // );
    
        if(updated.matchedCount==1 && updated.modifiedCount==1){
            return res.status(200).json("successfull rating");
        }
        else{
            res.status(400).json("couldn't update");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};

exports.getDoctorsOfEntity = async (req, res, next) => {
    try {
        const entityName = req.params.entity;
        const entity = await Entity.findOne({name:entityName});
        if(entity){
            const doctors = await Doctor.find({entity_id:entity._id},{
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