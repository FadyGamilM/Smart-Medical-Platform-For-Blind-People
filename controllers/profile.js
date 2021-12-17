// import models
const { Entity_Admin } = require("../models/Entity_Admin");
const { Doctor } = require("../models/Doctor");
const { User } = require("../models/User");
const { Entity } = require("../models/Entity");
const {Pharmacy} = require("../models/Pharmacy");

exports.getProfile = async (req, res, next) => {
	try {
        var returns = null;
		// (1) get the user id and type
		const _id  = req.params._id; 
        const type = req.params.type;
		// (2) fetch all information about user in different documents according to the type
        if(type === "hospital_admin" || type ==="clinic_admin")
        {
            const admin = await Entity_Admin.findById({
			    _id
	    	},
			{
				username: 1,
			});
            const entity = await Entity.findOne({
                admin:_id    
            })/*.populate("admin")*/;
            returns = {"username": admin,//.username,
                        "entity":entity     
            }
        }
        else if (type === "pharmacy_admin")
        {
            const admin = await Entity_Admin.findById({
			    _id
	    	},
			{
				username: 1,
			});
            const pharmacy = await Pharmacy.findOne({
                admin:_id    
            })/*.populate("admin")*/;
                returns = {"username": admin,//.username,
                            "pharmacy":pharmacy
                } 
        }
        else if (type === "doctor")
        {
            const doctor = await Doctor.findById({
                _id,
                }).populate("entity_id","patients","meetings");console.log(doctor);
                returns = {"username": doctor.username,
                            "patients":doctor.patients,
                            "profilePic":doctor.profilePic,
                            "meetings":doctor.meetings,
                            "specialization":doctor.specialization,
                            "bio":doctor.bio,
                            "timetable":doctor.timetable,
                            "rate":doctor.rate,
                            "entity_name":doctor.entity_id.name   
                }
        }
        else
        {
            const user = await User.findById({
                _id,
                }).populate("meetings");
                returns = {"username":User.username,
                            "gender":User.gender,
                            "profilePic":User.profilePic,
                            "meetings":User.meetings,
                            "history":User.history
                }
        }
		// (3) return response to client
		return res.status(200).json(returns);
	} catch (error) {console.log(error);
		console.log(error.message);
		next(error);
	}
};