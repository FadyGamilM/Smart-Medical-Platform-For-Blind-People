const router = require("express").Router();

//! import the route handler (controller) to each route
const { getHighlyRatedDoctors, getDepartmentDoctors } = require("../controllers/home");

// @ URL:                     /home
// @ METHOD:              GET
// @ DESCRIPTION        get highly rated doctors
router.route("/home").get(getHighlyRatedDoctors);
router.route("/department/:depName").get(getDepartmentDoctors);

module.exports = router;
