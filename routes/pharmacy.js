const router = require("express").Router();

// // import the route handler "controller"
const { getAllPharmacies,PharmaciesArabic } = require("../controllers/pharmacy");
// const { pharmacyApproval } = require("../controllers/pharmacy");
// // chain the route to the router app to chain it to main express app
// router.route("/pharmacy/:pharmacy_name").get(getPharmacy);
router.route("/pharmacies").get(getAllPharmacies);
router.route("/pharmacies/arabic").get(PharmaciesArabic);
// router.route("/pharmacy/order_check/:admin_id").patch(pharmacyApproval)

module.exports = router;