const router = require("express").Router();

// // import the route handler "controller"
const { getAllClinics,ClinicsArabic } = require("../controllers/clinic");

// // chain the route to the router app to chain it to main express app
// //router.route("/clinic").post(createNewClinic);

router.route("/clinics").get(getAllClinics);
router.route("/clinics/arabic").get(ClinicsArabic);
/////////////////////fady///////////////////////////
//router.route("/clinics").get(getAllClinics);// 2 apps

module.exports = router;
