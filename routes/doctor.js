const router = require("express").Router();

const { RegisterNewDoctor } = require("../controllers/doctor");

router.route("/doctor").post(RegisterNewDoctor);

module.exports = router;
