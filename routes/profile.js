const router = require("express").Router();

// import the route handler "controller"
const { getProfile } = require("../controllers/profile");
const { protect } = require("../middleware/authMiddleware");

// // // chain the route to the router app to chain it to main express app
// // router.route("/profile/:_id/:type").get(getProfile);

//this route must be protected
router.route("/profile").get(protect,getProfile);


module.exports = router;