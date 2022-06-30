const router = require("express").Router();
const {addAnnounce, getAnnounce,getPendingOrders,
    getApprovedOrders, getPreparingOrders, getHistory, 
    approveOrder, finishOrder,disApproveOrder,
    getDashboardData,editAdminInfo,deleteAnnounce,
    getAppointments,getAllOrders,getAppointmentsOfentity,
    editAnnounce,deactivateEntity,deactivateDoctor,deactivatePharmacy,
    getAge,activateEntity,activatePharmacy,activateDoctor,
    getDeactivatedClinics,getDeactivatedHospitals,
    getDeactivatedPharmacies,getDeactivatedDoctors,
    getDeactivatedDoctorsOfEntity,editDoctorPrice,
    getActiveProfit,editMap} = require("../controllers/admin");
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
//
//router.route("/admin/edit/map").patch(protect,editMap);
//
router.route("/admin/announcement/delete").delete(protect,deleteAnnounce);
router.route("/admin/announcement/edit").patch(protect,editAnnounce);
router.route("/admin/appointments").get(protect,getAppointments);
router.route("/admin/orders").get(protect,getAllOrders);
router.route("/admin/appointments/:entity").get(protect,getAppointmentsOfentity);
router.route("/admin/entity/deactivate").patch(protect,deactivateEntity);
router.route("/admin/doctor/deactivate").patch(protect,deactivateDoctor);
router.route("/admin/pharmcy/deactivate").patch(protect,deactivatePharmacy);
router.route("/admin/dashboard/ages").get(protect,getAge);
///
router.route("/admin/hospitals/deactivated").get(protect,getDeactivatedHospitals);
router.route("/admin/clinics/deactivated").get(protect,getDeactivatedClinics);
router.route("/admin/pharmacies/deactivated").get(protect,getDeactivatedPharmacies);
router.route("/admin/doctors/deactivated").get(protect,getDeactivatedDoctors);
router.route("/admin/doctors/deactivated/:entity").get(protect,getDeactivatedDoctorsOfEntity);

router.route("/admin/entity/activate").patch(protect,activateEntity);
router.route("/admin/pharmcy/activate").patch(protect,activatePharmacy);
router.route("/admin/doctor/activate").patch(protect,activateDoctor);
router.route("/admin/doctor/edit/price").patch(protect,editDoctorPrice);
///
router.route("/admin/dashboard/profit/:startDate/:endDate").get(protect,getActiveProfit);
//router.route("/admin/dashboard").get(protect,getDashboardData);
// trial
//router.route("/admin/edit/entity/activity").patch(editEntityActivity);
//router.route("/admin/edit/pharmacy/activity").patch(editPharmacyActivity);

module.exports = router;