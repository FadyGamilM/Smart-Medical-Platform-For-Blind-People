/*// import Hospital model
//const { Hospital } = require("../models/Hospital");
// import Docotr model
const { Doctor } = require("../models/Doctor");

// @METHOD                                             POST
// @URL                                                   /hospital
// @ACTION_PERFORMEER                          admin of the application
// @DESCRIPTION                                      admin of app need to create a new hospital entity in our app
exports.createNewHospital = async (req, res, next) => {
	try {
		// (1) create a new document of this hospital
		const hospital = await Hospital.create(req.body);
		// (2) return the new created document to client in response
		return res.status(201).json(hospital);
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};

// @METHOD                                             GET
// @URL                                                   /hospital/:hospitalID
// @ACTION_PERFORMEER                          user of application (mainly the patient)
// @DESCRIPTION                                      user need to see all doctors of this hospital
exports.getAllDoctors = async (req, res, next) => {
	try {
		// (1) get the hospital id
		const { hospitalID } = req.params;
		// (2) fetch all doctors that thier entity_id field === hospitalID
		const doctors = await Doctor.find({
			entity_id: hospitalID,
		});
		// (3) return response to client
		return res.status(200).json(doctors);
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};
*/