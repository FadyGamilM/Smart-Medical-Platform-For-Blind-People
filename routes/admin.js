const router = require("express").Router();
const {addAnnounce, getAnnounce,getPendingOrders,
    getApprovedOrders, getPreparingOrders, getHistory, 
    approveOrder, finishOrder,disApproveOrder,
    getDashboardData,editAdminInfo,deleteAnnounce,
    getAppointments,getAllOrders,getAppointmentsOfentity,
    editAnnounce,deactivateEntity,deactivateDoctor,deactivatePharmacy,
    getAge,editEntityActivity,editPharmacyActivity} = require("../controllers/admin");
const { protect } = require("../middleware/authMiddleware");

router.route("/admin/announcement").post(protect,addAnnounce);
router.route("/admin/getAnnouncements").get(protect,getAnnounce);
router.route("/admin/orders/pending").get(protect,getPendingOrders);
router.route("/admin/orders/approved").get(protect,getApprovedOrders);
router.route("/admin/orders/preparing").get(protect,getPreparingOrders);
router.route("/admin/orders/history").get(protect,getHistory);
router.route("/admin/order/approve").patch(protect,approveOrder);
router.route("/admin/order/disapprove").patch(protect,disApproveOrder);
router.route("/admin/order/done").patch(protect,finishOrder);
router.route("/admin/edit").patch(protect,editAdminInfo);
router.route("/admin/announcement/delete").delete(protect,deleteAnnounce);
router.route("/admin/announcement/edit").patch(protect,editAnnounce);
router.route("/admin/appointments").get(protect,getAppointments);
router.route("/admin/orders").get(protect,getAllOrders);
router.route("/admin/appointments/:entity").get(protect,getAppointmentsOfentity);
//router.route("/admin/entity/deactivate").patch(protect,deactivateEntity);
//router.route("/admin/doctor/deactivate").patch(protect,deactivateDoctor);
//router.route("/admin/pharmcy/deactivate").patch(protect,deactivatePharmacy);

//router.route("/admin/dashboard").get(protect,getDashboardData);
// trial
//router.route("/admin/edit/entity/activity").patch(editEntityActivity);
//router.route("/admin/edit/pharmacy/activity").patch(editPharmacyActivity);
router.route("/admin/dashboard/ages").get(protect,getAge);
module.exports = router;