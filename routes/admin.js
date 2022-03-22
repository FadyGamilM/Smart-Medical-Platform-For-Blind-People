const router = require("express").Router();
const {addAnnounce, getAnnounce,getNewOrders,getPendingOrders, getApprovedOrders, getDeliveredOrders, approveOrder, finishOrder} = require("../controllers/admin");
const { protect } = require("../middleware/authMiddleware");

router.route("/admin/announcement").post(protect,addAnnounce);
router.route("/admin/getAnnouncements").get(protect,getAnnounce);
router.route("/admin/orders/new").get(protect,getNewOrders);
router.route("/admin/orders/pending").get(protect,getPendingOrders);
router.route("/admin/orders/approved").get(protect,getApprovedOrders);
router.route("/admin/orders/history").get(protect,getDeliveredOrders);
router.route("/admin/order/approve").patch(protect,approveOrder);
router.route("/admin/order/done").patch(protect,finishOrder);

module.exports = router;