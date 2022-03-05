const router = require("express").Router();

const { rateDoctor, getDepartmentDoctors} = require("../controllers/user");

router.route("/user/rating/doctor/:doctorname").patch(rateDoctor);//rate doctor
router.route("/user/department/:depName").get(getDepartmentDoctors);//user application

module.exports = router;