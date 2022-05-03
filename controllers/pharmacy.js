// // import models
 const Pharmacy = require("../models/Pharmacy");
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
// @METHOD                                     GET
// @URL                                        /pharmacies
// @ACTION_PERFORMEER                          admin of application
// @DESCRIPTION                                admin need to see all pharmacies
exports.getAllPharmacies = async (req, res, next) => {
	try {
		const pharmacies = await Pharmacy.find({},{
			_id:0,
			name:1,
			arabic_name:1,
			icon:1,
			telephone:1,
			address:1
		}).populate({path: "admin", select: {username:1, email:1, _id:0}});
		return res.status(200).json(pharmacies);
	} catch (error) {
		console.log(error);
        res.status(400).json(error.message);
	}
};

exports.PharmaciesArabic = async (req, res, next) => {
	try {
		const pharmacies = await Pharmacy.find({},{
			_id:0,
			arabic_name:1,
		});
		return res.status(200).json(pharmacies);
	} catch (error) {
		console.log(error);
        res.status(400).json(error.message);
	}
};