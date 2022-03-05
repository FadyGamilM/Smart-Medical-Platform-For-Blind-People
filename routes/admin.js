const router = require("express").Router();
const {addAnnounce} = require("../controllers/admin");
const { protect } = require("../middleware/authMiddleware");

router.route("/admin/announcement").post(protect,addAnnounce);

module.exports = router;