// import Hospital model
const Entity = require("../models/Entity");
const Admin = require("../models/Entity_Admin");
// import Docotr model
const Doctor = require("../models/Doctor");
//const { isContext } = require("vm");

// @METHOD                                             POST
// @URL                                                   /hospital
// @ACTION_PERFORMEER                          admin of the application
// @DESCRIPTION                                      admin of app need to create a new hospital entity in our app
// exports.createNewHospital = async (req, res, next) => {
// 	try {
// 		// (1) create a new document of this hospital
// 		const hospital = await Hospital.create(req.body);
// 		// (2) return the new created document to client in response
// 		return res.status(201).json(hospital);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };

// @METHOD                                     GET
// @URL                                        /hospital/:hospitalID
// @ACTION_PERFORMEER                          user of application (mainly the patient)
// @DESCRIPTION                                user need to see all doctors of this hospital
// exports.getAllDoctors = async (req, res, next) => {
// 	try {
// 		// (1) get the hospital id
// 		const { hospitalID } = req.params;
// 		// (2) fetch all doctors that thier entity_id field === hospitalID
// 		const doctors = await Doctor.find({
// 			entity_id: hospitalID,
// 		});
// 		// (3) return response to client
// 		return res.status(200).json(doctors);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };

// @METHOD                                     GET
// @URL                                        /hospitals
// @ACTION_PERFORMEER                          admin of application
// @DESCRIPTION                                admin need to see all hospitals
exports.getAllHospitals = async (req, res, next) => {
	try {
		const hospitals = await Entity.find({flag:'H'},{
			_id:0,
			name:1,
			arabic_name:1,
			icon:1,
			telephone:1,
			address:1
		}).populate({path: "admin", select: {username:1, email:1, _id:0}});
		return res.status(200).json(hospitals);
	} catch (error) {
		console.log(error);
        res.status(400).json(error.message);
	}
};
