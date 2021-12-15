// import Entity model
const { Entity } = require("../models/Entity");
// import Docotr model
const { Doctor } = require("../models/Doctor");

// @METHOD                                             POST
// @URL                                                   /hospital
// @ACTION_PERFORMEER                          admin of the application
// @DESCRIPTION                                      admin of app need to create a new hospital entity in our app
// exports.createNewClinic = async (req, res, next) => {
// 	try {
// 		// (1) create a new document of this hospital
// 		const hospital = await Clinic.create(req.body);
// 		// (2) return the new created document to client in response
// 		return res.status(201).json(hospital);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };

// @METHOD                                           GET
// @URL                                              /clinic/:clinicID
// @ACTION_PERFORMEER                                user of application (mainly the patient)
// @DESCRIPTION                                      user need to see all doctors of this clinic
exports.getClinicInfo = async (req, res, next) => {
	try {
		// (1) get the clinic id
		const { clinicID } = req.params;
		// (2) fetch all doctors that thier entity_id field === clinicID
		const doctors = await Doctor.find({
			entity_id: clinicID,
		});
        // (3) get the clinic info
        const info = await Entity.findById(clinicID);
		// (4) return response to client
		return res.status(200).json(doctors,info);
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};