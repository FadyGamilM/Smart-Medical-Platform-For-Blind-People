const router = require("express").Router();

// // import the route handler "controller"
const { getAllClinics } = require("../controllers/clinic");

// // chain the route to the router app to chain it to main express app
// //router.route("/clinic").post(createNewClinic);

router.route("/clinics").get(getAllClinics);

module.exports = router;
