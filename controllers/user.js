const Doctor = require("../models/Doctor");
const Pharmacy = require("../models/Pharmacy");
const Admin = require("../models/Entity_Admin");
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
            const doctors = await Doctor.find({
                $or: [
                  { 'specialization': department },
                  { 'arabic_specialization': department }
                ]},
                {
                _id:0,
                password:0,
                gender:0,
                patients:0,
                meetings:0
            }).populate({path: "entity_id", select: {name:1,arabic_name:1, _id:0}});
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
        arabic_username:1,
        email:1,
        university:1,
        profilePic:1,
        specialization:1,
        arabic_specialization:1,
        bio:1,
        telephone:1,
	    timetable:1,
        reviews:1,
        rate:1,
        rate_count:1
    }).populate({path: "entity_id", select: {name:1,arabic_name:1, _id:0, flag:1}});; 
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
        
        // let D = String(req.params.d);
        // let M = String(req.params.m);
        // let Y = String(req.params.y);
        // let date = D +'/'+ M +'/'+ Y;
        // console.log(doctor_id)
        // console.log("date=",req.params.date);
        // console.log(typeof(req.params.date));
        //,Date:req.params.date
        const reserved = await Meeting.find({doctor:doctor_id,Date:req.params.date},{slot:1,_id:0});
        //console.log("reserved=",reserved)
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
        const orders = await Order.find({user:user_id},{user:0}).populate({path: "pharmacy", select: {name:1,arabic_name:1, _id:0, address:1, telephone:1}}); 
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
exports.makeOrder = async (req,res,next) =>{
    try {
        const user_id  = req.id;
        const admin_id = await Admin.findOne({email:req.body.adminEmail},{_id:1});
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1});
        if(admin_id && pharmacy){
            const newOrder = await Order.create({
                pharmacy: pharmacy,
                user: user_id,
                order_data: {
                form:req.body.form ,
                Date:req.body.date,
                address:req.body.address,
                phone:req.body.phone
                },
            });
            return res.status(200).json("order added successfully");
        }
        else{
            return res.status(400).json("there is something wrong with admin email or pharmacy");
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
};

// exports.userApproveOrder = async (req, res, next) =>{
//     try {
//         //checkout (payment api)
//         const updated = await Order.updateOne({_id:req.body.id},{$set: { "userApproval" : true }});
//         if(updated.matchedCount==1 && updated.modifiedCount==1){
//             return res.status(200).json("user approved order");
//         }
//         else{
//             res.status(400).json("couldn't approve order");
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

exports.userCancelOrder = async (req, res, next) =>{
    try {
        const user_id  = req.id;
        const deleted = await Order.deleteOne({_id:req.body.id, user:user_id});
        if(deleted.deletedCount==1){
            return res.status(200).json("user canceled order");
        }
        else{
            res.status(400).json("couldn't cancel order");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.editInfo = async (req,res,next) => {
    try {
            //"username":"",
            //"email":"",
            //"blood":""
            //"gender":"",
            //"dateOfBirth":"",
        const user_id  = req.id;
        if(req.body.email){
            const user = await User.findOne({email:req.body.email, _id:{ $ne: user_id }});
            if(user){
                res.status(400).json("this email already found");
            }
            else{
                const update=req.body;
                const updated = await User.updateOne({_id:user_id},update);
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
            const updated = await User.updateOne({_id:user_id},update);
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

exports.editPhoto = async (req,res,next) => {
    try {
        const user_id  = req.id;
        const updated = await User.updateOne({_id:user_id},{
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

exports.editHistory = async (req,res,next) => {
    try {
        const user_id  = req.id;
        const updated = await User.updateOne({_id:user_id},{
            history: req.body.history
        });
        if(updated.matchedCount==1 && updated.modifiedCount==1){
            return res.status(200).json("you edited your history successfully");
        }
        else{
            res.status(400).json("no change");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};