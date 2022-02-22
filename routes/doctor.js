const router = require("express").Router();

const { rateDoctor, getDoctorsOfEntity } = require("../controllers/doctor");

router.route("/doctor/rating").patch(rateDoctor);
router.route("/doctors/:entity").get(getDoctorsOfEntity)

module.exports = router;
