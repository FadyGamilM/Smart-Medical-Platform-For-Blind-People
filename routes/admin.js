const router = require("express").Router();
const {addAnnounce, getAnnounce} = require("../controllers/admin");
const { protect } = require("../middleware/authMiddleware");

router.route("/admin/announcement").post(protect,addAnnounce);
router.route("/admin/getAnnouncements").get(protect,getAnnounce);

module.exports = router;