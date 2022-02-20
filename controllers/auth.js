
const User = require("../models/User");
const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
//////////////////////////// TOKENS ////////////////////////////
const jwt = require("jsonwebtoken");
//const maxAge = 3*24*60*60;
//jwt.sign({payload }, ACCESS_TOKEN_SECRET, {options});
createToken = (userID) => {
	return jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30s",
	});
};

// exports.refreshToken = async (req, res, next) => {
// 	try {
// 		const refreshToken = req.body;
// 		if (!refreshToken) {
// 			return res.status(400).json({error: "refresh token is missing",});
// 		} else {
// 			// get the userid
// 			const userId = await VerifyRefreshToken(refreshToken);
// 			// now you can generate a new pair of access token and refresh token
// 			const newAccessToken = await SignAccessToken(userId);
// 			const newRefreshToken = await SignRefreshToken(userId);
// 			return res.status(200).json({
// 				data: {
// 					accessToken: newAccessToken,
// 					refreshToken: newRefreshToken,
// 				},
// 			});
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// };
/////////////////////////////// TOKENS ////////////////////////////

exports.registerUser = async(req,res,next) =>{
    try {
        //todo
        //check if the user already exist 
        const userExist = await User.findOne({email:req.body.email});
        //if no user create new one
        if(! userExist){
            const newUser = await User.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender
            });
            /////////////////////////////// TOKENS ////////////////////////////
            const token = createToken(newUser._id);
            /////////////////////////////// TOKENS ////////////////////////////
            return res.status(200).json({
                token
            });
        }
        else{
            res.status(400);
            throw Error("email already exist");
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};
exports.registerDoctor = async(req,res,next) =>{
    try {
        //todo
        //get the id of entity to which this doctor is related
        const entity = await Entity.findOne({
            name:req.body.entityName
        });
        if(!entity){
            //no entity with given name 
            res.status(400);
            throw Error("This entity doesn't exist");
        }
        else{
            //check if doctor already exist 
            const doctorExist = await Doctor.findOne({email:req.body.email});
            if(! doctorExist){
                const newDoctor = await Doctor.create({
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    gender:req.body.gender,
                    specialization:req.body.specialization,
                    entity_id:entity._id
                });
                return res.status(200).send("doctor has been added successfully.");
            }
            else{
                res.status(400);
                throw Error("email already exist");
            }  
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};
exports.registerHadmin = async(req,res,next) =>{
    try {
        //todo
        //check if the entity already exist
        const hospital = await Entity.findOne({name:req.body.hospitalname});
        const admin = await Admin.findOne({username:req.body.username});
        if(!hospital && !admin){
            //create new hospital admin
            const newAdmin = await Admin.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender,
                role:"h_admin"
            });
            //create new hospital
            const newHospital = await Entity.create({
                name:req.body.hospitalname,
                address:[req.body.address],
                telephone:[req.body.telephone],
                admin:newAdmin._id,
                flag:'H'
            });
            return res.status(200).send("hospital and admin have been added successfully.");
        }
        else{
            res.status(400).json("admin or hospital is already exist");
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};
exports.registerCadmin = async(req,res,next) =>{
    try {
        //todo
        //check if the entity already exist
        const clinic = await Entity.findOne({name:req.body.clinicname});
        const admin = await Admin.findOne({username:req.body.username});
        if(!clinic && !admin){
            //create new clinic admin
            const newAdmin = await Admin.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender,
                role:"c_admin"
            });
            //create new clnic
            const newClinic = await Entity.create({
                name:req.body.clinicname,
                address:[req.body.address],
                telephone:[req.body.telephone],
                admin:newAdmin._id,
                flag:'C'
            });
            return res.status(200).send("clinic and admin have been added successfully.");
        }else{
            res.status(400).json("admin or hospital is already exist");
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }  
};
exports.registerPadmin = async(req,res,next) =>{
    try {
        //todo
        //check if the entity already exist
        const pharmacy = await Entity.findOne({name:req.body.pharmacyname});
        const admin = await Admin.findOne({username:req.body.username});
        if(!pharmacy && !admin){
            //create new pharmacy admin
            const newAdmin = await Admin.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender,
                role:"p_admin"
            });
            //create new pharmacy
            const newPharmacy = await Pharmacy.create({
                name:req.body.pharmacyname,
                address:[req.body.address],
                telephone:[req.body.telephone],
                admin:newAdmin._id
            });
            return res.status(200).send("pharmacy and admin have been added successfully.");
        }else{
            res.status(400).json("admin or hospital is already exist");
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }  
};

// desc    POST request login user
// route   /login
// access  public access api
exports.login = async(req,res,next) => {
    try {
        //todo
        const {email, pass, type} = req.body;
        //const type = req.body.type;
        if(type=='admin'){
            const admin = await Admin.log(email, pass);         
            const token = createToken(admin._id);
            //todo => we need to return the info of entity to which this admin is related and also doctors in this hospital
            const adminRole = admin.role;
            // if(adminRole == 'h_admin'){
            //             const entity = Entity.findOne({admin:admin._id, flag:'H'});
            //             const doctors = Doctor.find({entity_id:entity._id,},
            //                 {
            //                     username:1,
            //                     email:1,
            //                     specialization:1,
            //                     profilePic:1,
            //                     bio:1,
            //                     rate:1
            //                 });
            //             const returns = {
            //                 admin,
            //                 entity,
            //                 doctors,
            //                 token
            //             };
            //             return res.status(200).json(returns);
            // }
            // else if(adminRole == 'c_admin'){
            //             const entity = Entity.findOne({admin:admin._id, flag:'C'});
            //             const doctors = Doctor.find({entity_id:entity._id,},
            //                 {
            //                     username:1,
            //                     email:1,
            //                     specialization:1,
            //                     profilePic:1,
            //                     bio:1,
            //                     rate:1
            //                 });
            //             const returns = {
            //                     admin,
            //                     entity,
            //                     doctors,
            //                     token
            //                 };
            //             return res.status(200).json(returns);
            // }
            // else if(adminRole == 'p_admin'){
            //             const pharmacy = Pharmacy.findOne({admin:admin._id}).populate("orders");
            //             const returns = {
            //                 admin,
            //                 pharmacy,
            //                 token
            //             };
            //             return res.status(200).json(returns);
            // }
            // else{
            //             const entities = Entity.find({});
            //             const pharmacies = Pharmacy.find({});
            //             const returns = {
            //                 admin,
            //                 entities,
            //                 pharmacies,
            //                 token
            //             };
            //             return res.status(200).json(returns);
            // }
            const returns = {
                token,
                adminRole 
            };
            return res.status(200).json(returns);
        }
        else if(type=='user'){
            const user = await User.log(email, pass);
            const token = createToken(user._id);
            return res.status(200).json({
                token
            });
        }
        else{
            const doctor = await Doctor.log(email, pass);
            const token = createToken(doctor._id);
            return res.status(200).json({
                token
            });
        }
        //return res.status(200)
    } catch (error) {
        // if(error.message === "incorrect password"){
        //     console.log("incorrect password");
        // }
        // else if(error.message === "incorrect email" ){
        //     console.log("incorrect email");
        // }
        // else{
        //     
        //     //return res.status(400).json(error.message);
        // }
        //
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};

// exports.logout = async(req,res,next) => {
//     try {
//         //todo

        
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };