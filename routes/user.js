const router = require("express").Router();

const { rateDoctor, getDepartmentDoctors, getDoctor, addReview, reserve, getReservedSlots, getOrders, makeOrder} = require("../controllers/user");
const { protect } = require("../middleware/authMiddleware");

router.route("/user/rating/doctor/:doctorname").patch(rateDoctor);//rate doctor
router.route("/user/department/:depName").get(getDepartmentDoctors);//user application
router.route("/user/doctor/:doctorname").get(getDoctor);//user application
router.route("/user/review/doctor/:doctorname").patch(addReview);//add review to doctor
router.route("/user/reservation/meeting").post(protect,reserve);//reserve meeting
router.route("/user/timetable/:doctorname/:date").get(getReservedSlots);//get reserved slots in certain date for certain doctor
router.route("/user/orders").get(protect,getOrders);//get orders of this user
router.route("/user/pharmacy/order").post(protect,makeOrder);
module.exports = router;