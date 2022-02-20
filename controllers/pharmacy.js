// // import models
// const {Pharmacy} = require("../models/Pharmacy");
// const {Order} = require("../models/Order");
// exports.getPharmacy = async (req, res, next) => {
// 	try {
//         const pharmacy = await Pharmacy.findOne({
//             name:req.params,
//         }).populate("orders");

//         return res.status(200).json(pharmacy);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };

// exports.pharmacyApproval = async (req, res, next) => {
// 	try {
//         const order = await Order.findOneAndUpdate({pharmacy:req.params,
//             pharmacyApproval:req.body.pharmacyApproval
            
//             }).populate("user","pharmacy");
//         const returns = { "user":order.user.username,
//                 "pharmacy":order.pharmacy.name,
//                 "order_data":order.order_data,
//                 "price":order.price,
//                 "userApproval":order.userApproval,
//                 "pharmacyApproval":order.pharmacyApproval
//         }
//         return res.status(200).json(returns);
// 	} catch (error) {
// 		console.log(error.message);
// 		next(error);
// 	}
// };