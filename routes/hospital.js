const router = require("express").Router();

// import the route handler "controller"
const { getAllHospitals } = require("../controllers/hospital");


//router.route("/hospital/:hospitalID").get(getAllDoctors);
router.route("/hospitals").get(getAllHospitals);// 2 apps

module.exports = router;
