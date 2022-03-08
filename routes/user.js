const router = require("express").Router();

const { rateDoctor, getDepartmentDoctors, getDoctor} = require("../controllers/user");

router.route("/user/rating/doctor/:doctorname").patch(rateDoctor);//rate doctor
router.route("/user/department/:depName").get(getDepartmentDoctors);//user application
router.route("/user/doctor/:doctorname").get(getDoctor);//user application

module.exports = router;