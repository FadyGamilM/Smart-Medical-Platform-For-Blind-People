const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
const Announce = require("../models/Announcement")
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

exports.addAnnounce = async (req, res, next) => {
    try {
        const _id  = req.id; 
        const type = req.type;
        if(type == "admin"){
            await Announce.create({
                announce:req.body.announcement,
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