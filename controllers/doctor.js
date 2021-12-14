const { Doctor } = require("../models/Doctor");
exports.RegisterNewDoctor = async (req, res, next) => {
	try {
		const doctor = await Doctor.create(req.body);
		return res.status(201).json(doctor);
	} catch (error) {
		console.log(error.message);
		next(error);
	}
};
