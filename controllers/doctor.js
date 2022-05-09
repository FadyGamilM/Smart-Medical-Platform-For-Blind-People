const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Meeting = require("../models/Meeting");
const Prescription = require("../models/Prescription");
const User = require("../models/User");



exports.getDoctorsOfEntity = async (req, res, next) => {
    try {
        const entityName = req.params.entity;
        const entity = await Entity.findOne({active:true,$or: [
            { 'name': entityName },
            { 'arabic_name': entityName }
          ]});
        if(entity){
            const doctors = await Doctor.find({entity_id:entity._id,active:true},{
                _id:0,
                password:0,
                gender:0,
                //patients:0,
                //meetings:0,
                //entity_id:0
            }).populate({path: "entity_id", select: {name:1,arabic_name:1, _id:0}}).sort({rate:-1});
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
};

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

exports.editDoctorInfo = async (req,res,next) => {
    try {
            //"username":"",
            //"arabic_username":"",
            //"email":"",
            //"gender":"",
            //"dateOfBirth":"",
            //"bio":"",
            //"telephone":""
        const doctor_id  = req.id;
        if(req.body.email){
            const doctor = await Doctor.findOne({email:req.body.email, _id:{ $ne: doctor_id }});
            if(doctor){
                res.status(400).json("this email already found");
            }
            else{
                const update=req.body;
                const updated = await Doctor.updateOne({_id:doctor_id},update);
                if(updated.matchedCount==1 && updated.modifiedCount==1){
                    return res.status(200).json("you edited your info successfully");
                }
                else{
                    res.status(400).json("no change");
                }
            }
        }
        else{
            const update=req.body;
            const updated = await Doctor.updateOne({_id:doctor_id},update);
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("you edited your info successfully");
            }
            else{
                res.status(400).json("no change");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.editDoctorPhoto = async (req,res,next) => {
    try {
        const doctor_id  = req.id;
        const updated = await Doctor.updateOne({_id:doctor_id},{
            profilePic: req.body.profilePic
        });
        if(updated.matchedCount==1 && updated.modifiedCount==1){
            return res.status(200).json("you edited your profile successfully");
        }
        else{
            res.status(400).json("no change");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.DoctorsArabic = async (req, res, next) => {
	try {
		const doctors = await Doctor.find({active:true},{
			_id:0,
			arabic_username:1,});
		return res.status(200).json(doctors);
	} catch (error) {
		console.log(error);
        res.status(400).json(error.message);
	}
};

exports.savePrescription = async (req, res, next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "doctor"){
            
            const user = await User.findOne({email:req.body.user_email},{_id:1});
            const prescription = await Prescription.create({
                user:user,
                doctor:_id,
                medicines:req.body.medicines,
                Date: new Date()
            });
            res.status(200).json("prescription has been saved");

        }
        else{
           res.status(401).json("not authorized, doctor action only"); 
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};

exports.getMeetings = async (req,res,next) =>{
    try {
        const doctor_id  = req.id; 
        const type = req.type;
        if(type == "doctor"){
            const meetings = await Meeting.find({doctor:doctor_id},{doctor:0,_id:0}).populate(
                {path: "user", select: {username:1,email:1, _id:0}}); 
            if(meetings.length != 0){
                return res.status(200).json(meetings);
            }
            else{
                return res.status(200).json("you have no meetings yet");
            }
        }
        else{
           res.status(401).json("not authorized, doctor action only"); 
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message); 
    }
};