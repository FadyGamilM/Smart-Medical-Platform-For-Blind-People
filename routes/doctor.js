const router = require("express").Router();

const { getDoctorsOfEntity, setTimeTable,editDoctorInfo,
    editDoctorPhoto,DoctorsArabic,savePrescription,
    getMeetings } = require("../controllers/doctor");
const { protect } = require("../middleware/authMiddleware");
//router.route("/doctor/rating").patch(rateDoctor);//rate doctor
//router.route("/user/rating/doctor/doctorname").patch(rateDoctor);//rate doctor mogoda f el user routes

//router.route("/doctors/:entity").get(getDoctorsOfEntity)// doctors in entity
router.route("/entity/:entity/doctors").get(getDoctorsOfEntity);// doctors in entity //2 applications
//router.route("/eli by3ml el action/el resource eli byt3ml 3aleh el action").get(getDoctorsOfEntity)// doctors in entity
router.route("/doctor/timetable").patch(protect,setTimeTable);
router.route("/doctor/edit/info").patch(protect,editDoctorInfo);
router.route("/doctor/edit/photo").patch(protect,editDoctorPhoto);
router.route("/doctors/arabic").get(DoctorsArabic);
router.route("/doctor/prescription/save").post(protect,savePrescription);
router.route("/doctor/meetings").get(protect,getMeetings);

module.exports = router;
