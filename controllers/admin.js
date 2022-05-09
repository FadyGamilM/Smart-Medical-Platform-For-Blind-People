const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
const Announce = require("../models/Announcement");
const Order = require("../models/Order");
const Meeting = require("../models/Meeting");
const User = require("../models/User");


//const Announcement = require("../models/Announcement");
//this must be protected 
// exports.deleteAdmin = async (req, res, next) => {
//     try {
//         //todo
//         const adminId = req.body.id;
//         console.log(typeof adminId);
//         const deletedAdmin = await Admin.findOneAndDelete({_id:adminId});
//         console(deletedAdmin);
//         res.status(200).json("Admin and Entity and doctors of this entity  deleted successfully")
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// }

// exports.getDashboardData = async (req, res, next) => {
//     try {
//         const _id  = req.id; 
//         const type = req.type;
//         if(type == "admin"){
//             //pie chart ( get number of hospitals & clinics & pharmacies)
//             const clinics = await Entity.find({flag:'C'},{name:1});
//             const hospitals = await Entity.find({flag:'H'},{name:1});
//             const pharmacies = await Pharmacy.find({},{name:1});
//             //get profit of each entity in each month
//             returns={ 
//                 clinics_Count:clinics.length,
//                 hospitals_count:hospitals.length,
//                 pharmacies_count:pharmacies.length};
//             res.status(200).json("announcement has been added successfully"); 
//         }
//         else{
//            res.status(401).json("not authorized, admin action only"); 
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

//edit info of hospital or clinic or pharmacy admin
exports.editAdminInfo = async(req,res,next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            //const entity = await Entity.findOne({name:req.body.entity_name});
            const admin = await Admin.findOne({email:req.body.admin_email, _id:{ $ne: _id }});
            if(admin){
                res.status(400).json("this email already found");
            }
            else{
                if(req.body.role=='owner'){
                    const updated_admin = await Admin.updateOne({_id},{
                        username:req.body.admin_username,
                        email:req.body.admin_email,
                        profilePic:req.body.admin_profilePic
                    });

                    res.status(200).json("you edited your profile successfully");
                    //res.status(400).json("something wrong happened");
                }
                else if(req.body.role=='p_admin'){
                    const entity = await Pharmacy.findOne({$or: [
                        { 'name': req.body.entity_name },
                        { 'arabic_name': req.body.arabic_entity_name }
                      ],admin:{ $ne: _id }});
                    if(entity){
                        res.status(400).json("this entity name already found");
                    }
                    else{
                        const updated_admin = await Admin.updateOne({_id},{
                            username:req.body.admin_username,
                            email:req.body.admin_email,
                            profilePic:req.body.admin_profilePic
                        });
                        const updated_entity = await Pharmacy.updateOne({admin:_id},{
                            name:req.body.entity_name,
                            arabic_name:req.body.arabic_entity_name,
                            address:req.body.entity_address,
                            telephone:req.body.entity_telephone
                        });
                        res.status(200).json("you edited your profile successfully");
                    }
                }
                else{
                    const entity = await Entity.findOne({$or: [
                        { 'name': req.body.entity_name },
                        { 'arabic_name': req.body.arabic_entity_name }
                      ],admin:{ $ne: _id }});
                    if(entity){
                        res.status(400).json("this entity name already found");
                    }
                    else{
                        const updated_admin = await Admin.updateOne({_id},{
                            username:req.body.admin_username,
                            email:req.body.admin_email,
                            profilePic:req.body.admin_profilePic
                        });
                        const updated_entity = await Entity.updateOne({admin:_id},{
                            name:req.body.entity_name,
                            arabic_name: req.body.arabic_entity_name,
                            address:req.body.entity_address,
                            telephone:req.body.entity_telephone
                        });
                        res.status(200).json("you edited your profile successfully");
                    }
                }
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message); 
    }

};

// exports.editEntityActivity = async (req,res,next) => {
//     try {
//         //const _id  = req.id;
//         const entity = req.body.entity
//         const updated = await Entity.updateOne({name:entity},{active:true});
//         if(updated.matchedCount==1 && updated.modifiedCount==1){
//             return res.status(200).json("edit done successfully"); 
//         }
//         else{
//             res.status(400).json("no change");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

// exports.editPharmacyActivity = async (req,res,next) => {
//     try {
//         //const _id  = req.id;
//         const entity = req.body.entity
//         const updated = await Pharmacy.updateOne({name:entity},{active:true});
//         if(updated.matchedCount==1 && updated.modifiedCount==1){
//             return res.status(200).json("edit done successfully"); 
//         }
//         else{
//             res.status(400).json("no change");
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

exports.addAnnounce = async (req, res, next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            await Announce.create({
                announce:{title:req.body.title,description:req.body.description},
                issuedAt:new Date(),
                owner:_id
            });
            res.status(200).json("announcement has been added successfully"); 
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.deleteAnnounce = async (req, res, next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const deleted = await Announce.deleteOne({'announce.title':req.body.title, owner:_id});
            if(deleted.deletedCount==1){
                return res.status(200).json("anouncement has been deleted successfully");
            }
            else{
                res.status(400).json("couldn't delete announcement");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.editAnnounce = async (req, res, next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const updated = await Announce.updateOne({'announce.title':req.body.title, owner:_id},{
                'announce.description':req.body.description
            });
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("anouncement has been updated successfully");
            }
            else{
                res.status(400).json("no change");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.getAnnounce = async (req, res, next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const announcements = await Announce.find({owner:_id},{
                announce:1,
                issuedA:1,
                _id:0
            });
            res.status(200).json(announcements); 
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};
///////////////////////////////////////////////////////////////
exports.getAge = async(req, res, next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        //{$year:new Date("$dateOfBirth")},
        if(type == "admin"){
            const males = await User.aggregate([
                { $match: { gender:"Male"}},
                {$group:{
                _id:{ $dateDiff: { startDate: "$dateOfBirth",
                                endDate: "$$NOW",
                                unit: "year" }}, 
                count:{$sum:1}
            }}]);
            const females = await User.aggregate([
                { $match: { gender:"Female"}},
                {$group:{
                _id:{ $dateDiff: { startDate: "$dateOfBirth",
                                endDate: "$$NOW",
                                unit: "year" }}, 
                count:{$sum:1}
            }}]);
            //////////////////////
            var dict = {};
            for (let x in males) {
                // code block to be executed
                dict[males[x]._id]=[males[x].count,0]
            };
            for (let x in females) {
                // code block to be executed
                if( dict[females[x]._id]){
                    dict[females[x]._id]=[ dict[females[x]._id][0], females[x].count]
                }else{
                    dict[females[x]._id]=[ 0, females[x].count]
                }
            };
            /////////////////
            // for(let x in dict){
            //     console.log("dic[x]=",dict[x]);
            //     console.log("male count =",dict[x][0]);
            //     console.log("female count =",dict[x][1]);
            // }
            res.status(200).json(dict);
            //res.status(200).json({males,females});
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

// exports.getAgeOfUsers = async (req, res, next) => {
//     try {
//         const _id  = req.id; 
//         const type = req.type;
//         if(type == "admin"){
//             //pie chart ( get number of hospitals & clinics & pharmacies)
//             //const clinics = await Entity.find({flag:'C'},{name:1});
//             //const hospitals = await Entity.find({flag:'H'},{name:1});
//             //const pharmacies = await Pharmacy.find({},{name:1});
//             //get profit of each entity in each month
// $group : {
//     _id : { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
//     totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
//     averageQuantity: { $avg: "$quantity" },
//     count: { $sum: 1 }
//  }
// $group : {
//     _id : { $dateDiff: { startDate: "$dateOfBirth",
//                          endDate: "$$NOW",
//                          unit: "year" } },
//     totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } },
//     averageQuantity: { $avg: "$quantity" },
//     count: { $sum: 1 }
//  }
// $group:
//              {
//                  _id: null,
//                  averageTime:
//                     {
//                        $avg:
//                           {
//                              $dateDiff:
//                                 {
//                                     startDate: "$purchased",
//                                     endDate: "$delivered",
//                                     unit: "day"
//                                 }
//                            }
//                     }
//              }
//             //find all users and group by year of dateOfBirth
//             //{$group : {_id:"$position", count:{$sum:1}}}
//             const users = await User.find({},{_id:0,gender:1}).group({_id:"$age", count:{$sum:1}});
//             // returns={ 
//             //     clinics_Count:clinics.length,
//             //     hospitals_count:hospitals.length,
//             //     pharmacies_count:pharmacies.length};
//             // res.status(200).json("announcement has been added successfully"); 
//         }
//         else{
//            res.status(401).json("not authorized, admin action only"); 
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };

//admin of app gets all meetings and their status
exports.getAppointments = async (req,res,next) => {
    try {
        //const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const appointments = await Meeting.find({},{_id:0}).populate(
                {path:"doctor",select:{username:1,email:1,_id:0},
            populate:{path:"entity_id",select:{name:1,_id:0}}}).populate(
                {path:"user",select:{username:1,email:1,_id:0}});
            if(appointments.length==0){
                res.status(200).json("no appointments available");
            }
            else{
                res.status(200).json(appointments);
            }
        }
        else{
            res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

//admin of app gets all orders and their status
exports.getAllOrders = async (req,res,next) => {
    try {
        //const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const orders = await Order.find({},{_id:0}).populate(
                {path:"pharmacy",select:{name:1,admin:1,_id:0},
                populate:{path:"admin",select:{username:1,email:1,_id:0}}}).populate(
                {path:"user",select:{username:1,email:1,_id:0}});
            if(orders.length==0){
                res.status(200).json("no orders available");
            }
            else{
                res.status(200).json(orders);
            }
        }
        else{
            res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

//get pending orders that waiting pharmacy approval
exports.getPendingOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,status:"pending"
                // userApproval:false,
                // pharmacyApproval:false,
                // pharmacyRespond:false,
                // userRespond:false
            },
                {order_data:1,price:1,user:1,status:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no pending orders"); 
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

//pharmacy approved and added price and witing for user response
exports.getApprovedOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,status:"approved"
                // userApproval:false,
                // pharmacyApproval:true,
                // pharmacyRespond:true,
                // userRespond:false
            },
                {order_data:1,price:1,user:1,status:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no approved orders"); 
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message); 
    }
};

//user approved and pharmacy will prepare order for user
exports.getPreparingOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,status:"preparing"
                // userApproval:true,
                // pharmacyApproval:true,
                // pharmacyRespond:true,
                // delivered:false,
                // userRespond:true
            },
                {order_data:1,price:1,user:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no preparing orders"); 
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

//delivered orders and orders canceled by pharmacy as well as orders cancelled by user
exports.getHistory = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,$or: [
                { status:"disapproved" },
                { status:"cancelled" },
                { status:"delivered" }]},
                {order_data:1,price:1,user:1,status:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no history"); 
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

//pharmacy admin approve order and add price
exports.approveOrder = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //add price to order and make pharmacy approval true 
            if(req.body.comment){
                const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},
                    {$set:{"price":req.body.price,"status":"approved", "comment":req.body.comment} });//{ "pharmacyApproval" : true, "price":req.body.price, "pharmacyRespond":true }
                if(updated.matchedCount==1 && updated.modifiedCount==1){
                    return res.status(200).json("the order is approved");
                }
                else{
                    res.status(400).json("couldn't approve order");
                }
            }
            else{
                const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},
                    {$set:{"price":req.body.price,"status":"approved"} });//{ "pharmacyApproval" : true, "price":req.body.price, "pharmacyRespond":true }
                if(updated.matchedCount==1 && updated.modifiedCount==1){
                    return res.status(200).json("the order is approved");
                }
                else{
                    res.status(400).json("couldn't approve order");
                }
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.disApproveOrder = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            if(req.body.comment){
                const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},
                    {$set: { "status":"disapproved", "comment":req.body.comment}});//{"pharmacyRespond":true }
                if(updated.matchedCount==1 && updated.modifiedCount==1){
                    return res.status(200).json("the order is disapproved");
                }
                else{
                    res.status(400).json("couldn't disapprove order");
                }
            }
            else{
                const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},
                    {$set: { "status":"disapproved"}});//{"pharmacyRespond":true }
                if(updated.matchedCount==1 && updated.modifiedCount==1){
                    return res.status(200).json("the order is disapproved");
                }
                else{
                    res.status(400).json("couldn't disapprove order");
                }
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.finishOrder = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},
                {$set:{ "status":"delivered"} });//{ "delivered":true }
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("done");
            }
            else{
                res.status(400).json("something wrong happened");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.getAppointmentsOfentity = async (req,res,next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            //const entity = await Entity.findOne({admin:_id},{_id:1});
            const entity = await Entity.findOne({name:req.params.entity},{_id:1});
            const doctors = await Doctor.find({entity_id:entity},{_id:1});
            const appointments = await Meeting.find({doctor:{ $in: doctors}},{_id:0}).populate(
                {path:"doctor",select:{username:1,email:1,_id:0},
            populate:{path:"entity_id",select:{name:1,_id:0}}}).populate(
                {path:"user",select:{username:1,email:1,_id:0}});
            if(appointments.length==0){
                res.status(200).json("no appointments available");
            }
            else{
                res.status(200).json(appointments);
            }
        }
        else{
            res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.deactivateEntity = async (req,res,next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const entity = req.body.name;
            //deactivate this entity
            const deactivated = await Entity.findOneAndUpdate({name:entity},{active:false});
            if(deactivated){
                //deactivate doctors of this entity
                const deactivated_doctors = await Doctor.updateMany({entity_id:deactivated._id},{active:false});
                if((deactivated_doctors.matchedCount == deactivated_doctors.modifiedCount)&&(deactivated_doctors.modifiedCount >0)){
                    return res.status(200).json("Entity is deactivated"); 
                }
                else{
                    const activated = await Entity.updateOne({name:entity},{active:true});
                    return res.status(400).json("couldn't deactivate entity");
                }
            }
            else{
                return res.status(400).json("couldn't deactivate entity");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.deactivatePharmacy = async (req,res,next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            const pharmacy = req.body.name;
            const deactivated = await Pharmacy.findOneAndUpdate({name:pharmacy},{active:false});
            if(deactivated){
                //find orders which is pending/approved
                const orders = await Order.find({pharmacy:deactivated._id, 
                    $or:[
                        {status:"pending"},
                        {status:"approved"}
                    ]},{_id:1});
                if(orders.length != 0){
                    //disapprove orders which is pending/approved
                    const disapproved_orders = await Order.updateMany({_id:{$in:orders}},
                        {status:"disapproved", comment:"Sorry, this order is disapproved due to inactivety of pharmacy"});
                    if((disapproved_orders.matchedCount == disapproved_orders.modifiedCount)&&(deactivated_doctors.modifiedCount >0)){
                        return res.status(200).json("Pharmacy is deactivated"); 
                    }
                    else{
                        const activated = await Pharmacy.updateOne({name:pharmacy},{active:true});
                        return res.status(400).json("couldn't deactivate pharmacy");
                    }
                }
                else{
                    return res.status(200).json("Pharmacy is deactivated");
                }
            }
            else{
                return res.status(400).json("couldn't deactivate pharmacy");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

exports.deactivateDoctor = async (req,res,next) =>{
    try {
        const _id  = req.id; 
        const type = req.type;
        const email = req.body.email;
        if(type == "admin"){
            //find this doctor and deactivate
            const deactivated_doctor = await Doctor.updateOne({email},{active:false});
            if(deactivated_doctor.matchedCount==1 && deactivated_doctor.modifiedCount==1){
                return res.status(200).json("Doctor is deactivated");
            }
            else{
                return res.status(400).json("couldn't deactivate doctor");
            }
        }
        else{
           res.status(401).json("not authorized, admin action only"); 
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    }
};

// exports.deactivateDoctor = async (req,res,next) =>{
//     try {
//         const _id  = req.id; 
//         const type = req.type;
//         const email = req.body.email;
//         if(type == "admin"){
//             //get id of this doctor we want to delete
//             const doctor = await Doctor.findOne({email},{_id:1});
//             //find pending meetings of this doctor and cancel them 
//             //and return to user cobon or money hey paid 
//             const pending_meetings = await Meeting.find({doctor,status:"pending"},{_id:1});
//             if(pending_meetings.length == 0){
//                 //check if there are meeings with status:"today"
//                 const today_meetings = await Meeting.find({doctor,status:"today"},{_id:1});
//                 if(today_meetings.length == 0){
//                     //deactivate doctor
//                     const deactivated = await Doctor.updateOne({email},{active:false});
//                     if(deactivated.matchedCount==1 && deactivated.modifiedCount==1){
//                         return res.status(200).json("Doctor is deactivated");
//                     }else{
//                         returnres.status(400).json("couldn't deactivate doctor");
//                     }
//                 }
//                 else{
//                     //deal with today meetings
//                     const deactivated = await Doctor.updateOne({email},{active:false});
//                     if(deactivated.matchedCount==1 && deactivated.modifiedCount==1){
//                         res.status(200).json("Doctor is deactivated");
//                     }else{
//                         res.status(400).json("couldn't deactivate doctor");
//                     }
//                 }
//             }
//             else{
//                 //cancel these meetings
//                 const cancelled_meeting = await Meeting.updateMany({_id:{$in:pending_meetings}},{status:"cancelled"});
//                 if((cancelled_meeting.matchedCount > 0) && (cancelled_meeting.matchedCount==cancelled_meeting.modifiedCount)){

//                 }
//                 const today_meetings = await Meeting.find({doctor,status:"today"},{_id:1});
//                 if(today_meetings == 0){

//                 }
//                 else{
                    
//                 }
//             }
//             //res.status(200).json("Doctor is deactivated"); 
//         }
//         else{
//            res.status(401).json("not authorized, admin action only"); 
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     }
// };