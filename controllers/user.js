const Doctor = require("../models/Doctor");
//const Entity = require("../models/Entity");

exports.rateDoctor = async (req, res, next) =>{
    try {
        //const doctorId = req.body.id;
        const email = req.params.doctorname;
        const newRating = req.body.rating;
        //console.log("newrating=",newRating);
        //console.log(typeof newRating);
        const doctor = await Doctor.findOne({email},{rate:1, rate_count:1});
        const oldRating = doctor.rate;
        const ratingCount = doctor.rate_count;
        //console.log("oldRating",oldRating);
        //console.log("ratingCount",ratingCount);
        //((old Rating * Rating count) + new Rating) / (Rating count + 1)
        const newRate = ((oldRating * ratingCount) + newRating) / (ratingCount + 1);
        //console.log("newRate",newRate);
        //console.log(typeof newRate);
        const updated = await Doctor.updateOne({email},{ $set: { "rate" : newRate }, $inc: { "rate_count": 1 } });
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

exports.getDepartmentDoctors = async (req, res, next) =>{
    try {
        const department = req.params.depName
        if(department){
            const doctors = await Doctor.find({specialization:department},{
                _id:0,
                password:0,
                gender:0,
                patients:0,
                meetings:0
            }).populate({path: "entity_id", select: {name:1, _id:0}});
            if(doctors.length != 0){
                return res.status(200).json(doctors);
            }
            else{
                return res.status(200).json("no doctors found in this department");
            }
        }
        else{
            res.status(400).json("no department is chosen")
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
}
exports.getDoctor = async (req,res,next) =>{
 try {
    const email = req.params.doctorname; 
    const doctor = await Doctor.findOne({email},{
        _id:0,
        username:1,
        email:1,
        university:1,
        profilePic:1,
        specialization:1,
        bio:1,
        telephone:1,
	    timetable:1,
        reviews:1,
        rate:1,
        rate_count:1
    }).populate({path: "entity_id", select: {name:1, _id:0, flag:1}});; 
    if(doctor){
        return res.status(200).json(doctor);
    }
    else{
        return res.status(400).json("no doctor found with this name");
    }
 } catch (error) {
    console.log(error);
    return res.status(400).json(error.message); 
 }
};