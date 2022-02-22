const router = require("express").Router();

// import the route handler "controller"
const { getAllHospitals } = require("../controllers/hospital");

// chain the route to the router app to chain it to main express app
//router.route("/hospital").post(createNewHospital);

//router.route("/hospital/:hospitalID").get(getAllDoctors);
router.route("/hospitals").get(getAllHospitals);

module.exports = router;
