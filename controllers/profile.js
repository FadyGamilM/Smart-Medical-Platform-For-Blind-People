// import models
const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");

exports.getProfile = async (req, res, next) => {
	try {
           //var returns = null;
		   // (1) get the user id and type from the token<<<<<<<<<<<<<<<<<<<<<<<,
		   const _id  = req.id; 
           const type = req.type;
		   // (2) fetch all information about user in different documents according to the type
            if(type === "admin")
            {
                const admin = await Admin.findById({
                        _id
                    },
                    {
                        _id: 0,
                        password:0
                    });
                const role = admin.role;
                if(role == "c_admin" || role == "h_admin"){
                    const entity = await Entity.findOne({
                        admin:_id    
                    });
                    const returns = {
                        admin,
                        entity    
                    };
                    return res.status(200).json(returns);
                }
                else if(role == "p_admin"){
                    const pharmacy = await Pharmacy.findOne({
                        admin:_id    
                    });
                    const returns = {
                        admin,
                        pharmacy   
                    };
                    return res.status(200).json(returns);
                }
                else{
                    
                    return res.status(200).json(admin);
                }
    
            }
            else if (type === "doctor")
            {
                const doctor = await Doctor.findById({
                    _id,
                }).populate({path: "entity_id", select: {name:1}}).populate(
                    {path:"patients", select:{username:1}}).populate(
                        {path:"meetings"}
                    );
                console.log(doctor);
                const returns = {"username": doctor.username,
                                "patients":doctor.patients,
                                "profilePic":doctor.profilePic,
                                "specialization":doctor.specialization,
                                "bio":doctor.bio,
                                "meetings":doctor.meetings,
                                "timetable":doctor.timetable,
                                "rate":doctor.rate,
                                "entity_name":doctor.entity_id.nameو
                                //clinic or hospital   
                    }
                    return res.status(200).json(returns);
            }
            else
            {
                const user = await User.findById({
                    _id,
                });//.populate("meetings");
                const returns = {"username":user.username,
                                "email":user.email,
                                "gender":user.gender,
                                "profilePic":user.profilePic,
                                "history":user.history
                    }
                    return res.status(200).json(returns);
            }
            // (3) return response to client
            //return res.status(200).json(returns);
	} catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
	}
};