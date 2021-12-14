// import Hospital model
const { Hospital } = require("../models/Hospital");

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
