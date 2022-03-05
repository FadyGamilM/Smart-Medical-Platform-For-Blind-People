const router = require("express").Router();

const { getDoctorsOfEntity } = require("../controllers/doctor");

//router.route("/doctor/rating").patch(rateDoctor);//rate doctor
//router.route("/user/rating/doctor/doctorname").patch(rateDoctor);//rate doctor mogoda f el user routes

//router.route("/doctors/:entity").get(getDoctorsOfEntity)// doctors in entity
router.route("/entity/:entity/doctors").get(getDoctorsOfEntity)// doctors in entity //2 applications
//router.route("/eli by3ml el action/el resource eli byt3ml 3aleh el action").get(getDoctorsOfEntity)// doctors in entity


module.exports = router;
