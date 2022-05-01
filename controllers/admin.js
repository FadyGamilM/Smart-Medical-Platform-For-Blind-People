const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
const Announce = require("../models/Announcement");
const Order = require("../models/Order");
const { findOne } = require("../models/Order");

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
                    res.status(400).json("something wrong happened");
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

exports.getNewOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,userApproval:false,pharmacyApproval:false},
                {order_data:1,price:1,user:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no new orders"); 
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

exports.getPendingOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,userApproval:false,pharmacyApproval:true},
                {order_data:1,price:1,user:1}).populate(
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

exports.getApprovedOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,userApproval:true,pharmacyApproval:true,delivered:false},
                {order_data:1,price:1,user:1}).populate(
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

exports.getDeliveredOrders = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //get orders where user and pharmacy approvals both are false
            const orders = await Order.find({pharmacy,delivered:true},
                {order_data:1,price:1,user:1}).populate(
                {path:"user", 
                select: {_id:0,username:1,email:1,profilePic:1}});
            if(orders.length != 0){
                res.status(200).json(orders); 
            }
            else{
                res.status(200).json("there is no delivered orders"); 
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

exports.approveOrder = async (req, res, next) =>{
    try {
        const admin_id  = req.id; 
        const type = req.type;
        const pharmacy = await Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //add price to order and make pharmacy approval true 
            const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},{$set: { "pharmacyApproval" : true, "price":req.body.price, "pharmacyRespond":true }});
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("the order is approved");
            }
            else{
                res.status(400).json("couldn't approve order");
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
            //delete the order so it won't appear at user or pharmacy
            const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},{$set: { "pharmacyRespond":true }});
            if(updated.matchedCount==1 && updated.modifiedCount==1){
                return res.status(200).json("the order is disapproved");
            }
            else{
                res.status(400).json("couldn't disapprove order");
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
        const pharmacy = Pharmacy.findOne({admin:admin_id},{_id:1})
        if(type == "admin" && pharmacy){
            //make delivered true 
            const updated = await Order.updateOne({_id:req.body.id,pharmacy:pharmacy},{$set: { "delivered":true }});
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