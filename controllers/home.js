// import DOCTOR model to deal with database
const Doctor = require("../models/Doctor");

// @ route handler for  [ GET /home ]
exports.getHighlyRatedDoctors = async (req, res, next) => {
	try {
		// (1) fetch all required info about doctors
		// NOTE, i am not gonna fetch the whole document, only the required fields we need for home page and the _id will be fetched by default so if they clicked on any doctor card they can access his/her _id
		// this is called projection in mongodb DB
		let doctors = await Doctor.find(
			{
				rate: {
					$gte: 4,
				}
			},
			{
				username: 1,
				profilePic: 1,
                email:1,
				specialization: 1,
                bio:1,
                timetable:1,
				rate: 1,
				entity_id: 1,
			}
		).populate({path: "entity_id", select: {name:1}});
		// (2) return the response to client
		return res.status(200).json(doctors);
	} catch (error) {
		console.log(error);
        return res.status(400).json(error.message);
	}
};


exports.getDepartmentDoctors = async (req, res, next) =>{
    try {
        const department = req.params.depName
        if(department){
            const doctors = await Doctor.find({specialization:department},{
                password:0,
                gender:0,
                patients:0,
                meetings:0
            }).populate({path: "entity_id", select: {name:1}});
            if(doctors.length != 0){
                return res.status(200).json(doctors);
            }
            else{
                return res.status(200).json("no doctors found in this department");
            }
        }
        else{
            res.status(400).json("no department is chosen")
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
}