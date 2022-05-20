const router = require("express").Router();

//! import the route handler (controller) to each route
const { getHomeData, getEntitiesInfo } = require("../controllers/home");

// @ URL:                     /home
// @ METHOD:              GET
// @ DESCRIPTION        get highly rated doctors
//router.route("/home").get(getHighlyRatedDoctors);
router.route("/home").get(getHomeData);//highly rated doctors & announcements in user app
//router.route("/department/:depName").get(getDepartmentDoctors);
//router.route("/user/department/:depName").get(getDepartmentDoctors);//user application
router.route("/entities/info").get(getEntitiesInfo);
module.exports = router;
