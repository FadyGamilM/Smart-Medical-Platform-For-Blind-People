const router = require("express").Router();

// import the route handler "controller"
const { getClinicInfo } = require("../controllers/clinic");

// chain the route to the router app to chain it to main express app
//router.route("/clinic").post(createNewClinic);

router.route("/clinic/:clinicID").get(getClinicInfo);

module.exports = router;
