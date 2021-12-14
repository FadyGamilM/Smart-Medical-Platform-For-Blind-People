const router = require("express").Router();

// import the route handler "controller"
const { createNewHospital } = require("../controllers/hospital");

// chain the route to the router app to chain it to main express app
router.route("/hospital").post(createNewHospital);

module.exports = router;
