const Doctor = require("../models/Doctor");
//const Entity = require("../models/Entity");
const Meeting = require("../models/Meeting");
const User = require("../models/User");
const Order = require("../models/Order");

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

exports.addReview = async (req, res, next) => {
    try {
        //todo: add review to certain doctor by his email
        const email = req.params.doctorname; 
        const updated = await Doctor.updateOne({email},{
            $push:{reviews:req.body.review}
        });
        if(updated.matchedCount==1 && updated.modifiedCount==1){
            return res.status(200).json("your review has been added successfully");
        }
        else{
            res.status(400).json("couldn't update");
        }
        //const doctor = await Doctor.findById({_id:doctorId},{rate:1, rate_count:1});

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

exports.reserve = async (req,res,next) =>{
    try {
        //get id of user and docyor to create the new meeting
        const user_id  = req.id; 
        //const type = req.type;
        const doctor_id = await Doctor.findOne({email:req.body.doctorEmail},{_id:1});
        const meeting = await Meeting.create({
            user:user_id,
            doctor:doctor_id,
            Date:req.body.date,
            day:req.body.day,
            slot:req.body.slot,
            status:"pending"
        });
        await Doctor.updateOne({_id:doctor_id},{ $push:{meetings:meeting._id}});
        await User.updateOne({_id:user_id},{ $push:{meetings:meeting._id}});
        return res.status(200).json("you reserved meeting successfully");
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
};
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
exports.getReservedSlots = async (req,res,next) =>{
    try {
        const doctor_id = await Doctor.findOne({email:req.params.doctorname},{_id:1});
        //const date = req.body.date;
        const reserved = await Meeting.find({doctor:doctor_id,Date:req.body.date},{slot:1,_id:0});
        if(reserved.length != 0){
            return res.status(200).json(reserved);
        }
        else{
            return res.status(200).json("no reservations in this date");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message); 
    }
};
exports.getOrders = async (req,res,next) =>{
    try {
        const user_id  = req.id;
        const orders = await Order.find({user:user_id},{_id:0,user:0}).populate({path: "pharmacy", select: {name:1, _id:0, address:1, telephone:1}}); 
        if(orders.length != 0){
            return res.status(200).json(orders);
        }
        else{
            return res.status(200).json("you have no orders yet");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message); 
    }
};