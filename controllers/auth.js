
const User = require("../models/User");
const Admin = require("../models/Entity_Admin");
const Doctor = require("../models/Doctor");
const Entity = require("../models/Entity");
const Pharmacy = require("../models/Pharmacy");
//////////////////////////// TOKENS ////////////////////////////
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//jwt.sign({payload }, ACCESS_TOKEN_SECRET, {options});
//type = "user" or "doctor" or "admin"
createToken = (userID, type) => {
	return jwt.sign({ userID, type }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
};

// createToken = (userID) => {
//  	return jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET, {
//  		expiresIn: "1d",
//  	});
// };

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
        if((req.body.username == "")||(req.body.email =="")||(req.body.password =="")||
        (req.body.gender =="")||(req.body.dateOfBirth=="")){
            res.status(400).json("required data is empty");
        }
        else{
            //check if the user already exist 
            const userExist = await User.findOne({email:req.body.email});
            //if no user create new one
            if(! userExist){
                const newUser = await User.create({
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    gender:req.body.gender,
                    dateOfBirth:req.body.dateOfBirth,
                    blood:req.body.blood,
                    address:req.body.address,
                    phone:req.body.phone,
                    face:true
                });
                const token = createToken(newUser._id, "user");
                const returns = {
                    username:newUser.username,
                    email:newUser.email,
                    profilePic:newUser.profilePic,
                    gender:newUser.gender,
                    history:newUser.history,
                    dateOfBirth:newUser.dateOfBirth,
                    blood:newUser.blood,
                    address:newUser.address,
                    phone:newUser.phone,
                    token
                };
                return res.status(200).json(returns);
            }
            else{
                res.status(400).json("email already exist");
                //throw Error("email already exist");
            }
            
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};
exports.registerDoctor = async(req,res,next) =>{
    try {
        //todo
        if((req.body.username == "")||(req.body.email =="")||(req.body.password =="")||
        (req.body.gender =="")||(req.body.arabic_username =="")||(req.body.specialization=="")||
        (req.body.university=="")||(req.body.meeting_price=="")||(req.body.telephone=="")){
                res.status(400).json("required data is empty");
        }
        else{
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
                const adminExist = await Admin.findOne({email:req.body.email});
                const doctorExist = await Doctor.findOne({email:req.body.email});
                if(!doctorExist && !adminExist){
                    const newDoctor = await Doctor.create({
                        username:req.body.username,
                        arabic_username:req.body.arabic_username,
                        email:req.body.email,
                        password:req.body.password,
                        gender:req.body.gender,
                        university:req.body.university,
                        profilePic: req.body.profilePic,
                        specialization:req.body.specialization,
                        arabic_specialization:req.body.arabic_specialization,
                        telephone:req.body.telephone,
                        meeting_price:req.body.meeting_price,
                        entity_id:entity._id
                    });
                    return res.status(200).send("doctor has been added successfully.");
                }
                else{
                    res.status(400);
                    throw Error("email already exist");
                }  
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
        if((req.body.username == "")||(req.body.email =="")||(req.body.password =="")||
        (req.body.gender =="")||(req.body.longitude=="")||(req.body.latitude=="")||
        (req.body.address=="")||(req.body.telephone=="")||(req.body.hospitalname=="")||
        (req.body.arabic_hospitalname=="")){
                res.status(400).json("required data is empty");
        }
        else{
            //check if the entity already exist
            const hospital = await Entity.findOne({ $or:[
                {'name':req.body.hospitalname},
                {'arabic_name':req.body.arabic_hospitalname}
            ]});
            const admin = await Admin.findOne({email:req.body.email});
            const doctor = await Doctor.findOne({email:req.body.email});
            if(!hospital){
                if(!doctor && !admin){
                    //create new hospital admin
                    const newAdmin = await Admin.create({
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        gender:req.body.gender,
                        profilePic: req.body.profilePic,
                        role:"h_admin"
                    });
                    //create new hospital
                    const newHospital = await Entity.create({
                    name:req.body.hospitalname,
                    arabic_name:req.body.arabic_hospitalname,
                    address:[req.body.address],
                    latitude:req.body.latitude,
                    longitude:req.body.longitude,
                    telephone:[req.body.telephone],
                    admin:newAdmin._id,
                    flag:'H'
                });
                return res.status(200).send("hospital and admin have been added successfully.");
                } 
                else{
                    res.status(400).json("this email already exists");
                }
            }
            else{
                res.status(400).json("hospital already exists");
            }
            
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    } 
};
exports.registerCadmin = async(req,res,next) =>{
    try {
        //todo
        if((req.body.username == "")||(req.body.email =="")||(req.body.password =="")||
        (req.body.gender =="")||(req.body.longitude=="")||(req.body.latitude=="")||
        (req.body.address=="")||(req.body.telephone=="")||(req.body.clinicname=="")||
        (req.body.arabic_clinicname=="")){
            res.status(400).json("required data is empty");
        }
        else{
            //check if the entity already exist
            const clinic = await Entity.findOne({ $or:[
                {'name':req.body.clinicname},
                {'arabic_name':req.body.arabic_clinicname}
            ]});
            const admin = await Admin.findOne({email:req.body.email});
            const doctor = await Doctor.findOne({email:req.body.email});
            if(!clinic){
                if(!doctor && !admin){
                    //create new clinic admin
                    const newAdmin = await Admin.create({
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        gender:req.body.gender,
                        profilePic: req.body.profilePic,
                        role:"c_admin"
                    });
                    //create new clnic
                    const newClinic = await Entity.create({
                        name:req.body.clinicname,
                        arabic_name:req.body.arabic_clinicname,
                        address:[req.body.address],
                        latitude:req.body.latitude,
                        longitude:req.body.longitude,
                        telephone:[req.body.telephone],
                        admin:newAdmin._id,
                        flag:'C'
                    });
                    return res.status(200).send("clinic and admin have been added successfully.");
                }
                else{
                    res.status(400).json("this email already exists");
                }
            }    
            else{
                res.status(400).json("clinic already exists");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }  
};
exports.registerPadmin = async(req,res,next) =>{
    try {
        //todo
        if((req.body.username == "")||(req.body.email =="")||(req.body.password =="")||
        (req.body.gender =="")||(req.body.longitude=="")||(req.body.latitude=="")||
        (req.body.address=="")||(req.body.telephone=="")||(req.body.pharmacyname=="")||
        (req.body.arabic_pharmacyname=="")){
            res.status(400).json("required data is empty");
        }
        else{
            //check if the entity already exist
            const pharmacy = await Pharmacy.findOne({ $or:[
                {'name':req.body.pharmacyname},
                {'arabic_name':req.body.arabic_pharmacyname}
            ]});
            const admin = await Admin.findOne({email:req.body.email});
            const doctor = await Doctor.findOne({email:req.body.email});
            if(!pharmacy ){
                if(!doctor && !admin){
                    //create new pharmacy admin
                    const newAdmin = await Admin.create({
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        gender:req.body.gender,
                        profilePic: req.body.profilePic,
                        role:"p_admin"
                    });
                    //create new pharmacy
                    const newPharmacy = await Pharmacy.create({
                        name:req.body.pharmacyname,
                        arabic_name:req.body.arabic_pharmacyname,
                        address:[req.body.address],
                        latitude:req.body.latitude,
                        longitude:req.body.longitude,
                        telephone:[req.body.telephone],
                        admin:newAdmin._id
                    });
                    return res.status(200).send("pharmacy and admin have been added successfully.");
                }
                else{
                    res.status(400).json("this email already exists");
                }
                
            }else{
                res.status(400).json("pharmacy already exists");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json(error.message);
    }  
};

// exports.registerAadmin = async(req,res,next) =>{
//     try {
//         //todo
//             const newAdmin = await Admin.create({
//                 username:req.body.username,
//                 email:req.body.email,
//                 password:req.body.password,
//                 gender:req.body.gender,
//                 role:"owner"
//             });
//             return res.status(200).send("Admin has been added successfully.");
//     } catch (error) {
//         console.log(error);
//         res.status(400).json(error.message);
//     } 
// };

// desc    POST request login user
// route   /login
// access  public access api


// exports.login = async(req,res,next) => {
//     try {
//         //todo
//         const {email, pass, type} = req.body;
//         //const type = req.body.type;
//         if(type=='admin'){
//             const admin = await Admin.log(email, pass);         
//             const token = createToken(admin._id, "admin");
//             //todo => we need to return the info of entity to which this admin is related and also doctors in this hospital
//             const adminRole = admin.role;
//             // if(adminRole == 'h_admin'){
//             //             const entity = Entity.findOne({admin:admin._id, flag:'H'});
//             //             const doctors = Doctor.find({entity_id:entity._id,},
//             //                 {
//             //                     username:1,
//             //                     email:1,
//             //                     specialization:1,
//             //                     profilePic:1,
//             //                     bio:1,
//             //                     rate:1
//             //                 });
//             //             const returns = {
//             //                 admin,
//             //                 entity,
//             //                 doctors,
//             //                 token
//             //             };
//             //             return res.status(200).json(returns);
//             // }
//             // else if(adminRole == 'c_admin'){
//             //             const entity = Entity.findOne({admin:admin._id, flag:'C'});
//             //             const doctors = Doctor.find({entity_id:entity._id,},
//             //                 {
//             //                     username:1,
//             //                     email:1,
//             //                     specialization:1,
//             //                     profilePic:1,
//             //                     bio:1,
//             //                     rate:1
//             //                 });
//             //             const returns = {
//             //                     admin,
//             //                     entity,
//             //                     doctors,
//             //                     token
//             //                 };
//             //             return res.status(200).json(returns);
//             // }
//             // else if(adminRole == 'p_admin'){
//             //             const pharmacy = Pharmacy.findOne({admin:admin._id}).populate("orders");
//             //             const returns = {
//             //                 admin,
//             //                 pharmacy,
//             //                 token
//             //             };
//             //             return res.status(200).json(returns);
//             // }
//             // else{
//             //             const entities = Entity.find({});
//             //             const pharmacies = Pharmacy.find({});
//             //             const returns = {
//             //                 admin,
//             //                 entities,
//             //                 pharmacies,
//             //                 token
//             //             };
//             //             return res.status(200).json(returns);
//             // }
//             const returns = {
//                 token,
//                 adminRole 
//             };
//             return res.status(200).json(returns);
//         }
//         else if(type=='user'){
//             const user = await User.log(email, pass);
//             const token = createToken(user._id, "user");
//             return res.status(200).json({
//                 token
//             });
//         }
//         else{
//             const doctor = await Doctor.log(email, pass);
//             const token = createToken(doctor._id, "doctor");
//             return res.status(200).json({
//                 token
//             });
//         }
//         //return res.status(200)
//     } catch (error) {
//         // if(error.message === "incorrect password"){
//         //     console.log("incorrect password");
//         // }
//         // else if(error.message === "incorrect email" ){
//         //     console.log("incorrect email");
//         // }
//         // else{
//         //     
//         //     //return res.status(400).json(error.message);
//         // }
//         //
//         console.log(error.message);
//         res.status(400).json(error.message);
//     } 
// };

exports.loginUserApp = async(req,res,next) => {
    try {
        //todo
        const {email, pass} = req.body;
        if(email && pass){
            const user = await User.log(email, pass);
            const token = createToken(user._id,"user");
            const returns = {
                username:user.username,
                email:user.email,
                profilePic:user.profilePic,
                gender:user.gender,
                history:user.history,
                dateOfBirth:user.dateOfBirth,
                blood:user.blood,
                address:user.address,
                phone:user.phone,
                token
            };
            return res.status(200).json(returns);
        }
        else{
            res.status(400).json("missing data");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    } 
};

exports.loginUserWithFace = async(req,res,next) => {
    try {
        //todo
        const email= req.body.email;
        if(email){
            const user = await User.findOne({email});
            if(user){
                const token = createToken(user._id,"user");
                const returns = {
                    username:user.username,
                    email:user.email,
                    profilePic:user.profilePic,
                    gender:user.gender,
                    history:user.history,
                    dateOfBirth:user.dateOfBirth,
                    blood:user.blood,
                    address:user.address,
                    phone:user.phone,
                    token
                };
                return res.status(200).json(returns);
            }
            else{
                return res.status(200).json("no user found");
            }
        }
        else{
            res.status(400).json("missing data");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    } 
};

exports.loginDoctorApp = async(req,res,next) => {
    try {
        //todo
        const {email, pass} = req.body;
        if(email && pass){
            const admin = await Admin.findOne({email});
            if(!admin){
                const doctor = await Doctor.findOne({email}).populate(
                    {path: "entity_id", select: {name:1,arabic_name:1,_id:0, flag:1}});
                    //.populate({path: "meetings",select:{_id:0,user:1,Date:1,day:1,slot:1,meeting_link:1,status:1},populate:{path:"user",select:{_id:0,username:1,email:1}}});
                if(!doctor){
                    throw Error("incorrect email");
                }
                else{
                    const valid = await bcrypt.compare(pass, doctor.password);
                    if(valid){
                        //login doctor
                        const token = createToken(doctor._id,"doctor");
                        const returns = {
                            username:doctor.username,
                            arabic_username:doctor.arabic_username,
                            email:doctor.email,
                            profilePic:doctor.profilePic,
                            gender:doctor.gender,
                            university:doctor.university,
                            specialization:doctor.specialization,
                            arabic_specialization:doctor.arabic_specialization,
                            bio:doctor.bio,
                            reviews:doctor.reviews,
                            telephone: doctor.telephone,
                            meeting_price:doctor.meeting_price,
                            timetable:doctor.timetable,
                            rate_count:doctor.rate_count,
                            rate:doctor.rate,
                            dateOfBirth:doctor.dateOfBirth,
                            entity_id:doctor.entity_id,
                            role:"doctor",
                            active:doctor.active,
                            token
                        };
                        return res.status(200).json(returns);
                    }
                    else{
                        throw Error("incorrect password");
                    }

                }
            }
            else{
                const valid = await bcrypt.compare(pass, admin.password);
                if(valid){
                    //login admin
                    const token = createToken(admin._id,"admin");
                    //if p_admin return pharmacy name
                    if(admin.role =="p_admin"){
                        const entity = await Pharmacy.findOne({admin:admin._id},{
                            _id:0,
                            admin:0
                            // name:1,
                            // arabic_name:1,
                            // address:1,
                            // telephone:1,
                            // icon:1
                        });
                        const returns = {
                            username:admin.username,
                            email:admin.email,
                            gender:admin.gender,
                            profilePic:admin.profilePic,
                            role:admin.role,
                            entity,
                            token
                        };
                        return res.status(200).json(returns);
                    }
                    else if(admin.role =="owner"){
                        const returns = {
                            username:admin.username,
                            email:admin.email,
                            gender:admin.gender,
                            profilePic:admin.profilePic,
                            role:admin.role,
                            token
                        };
                        return res.status(200).json(returns);
                    }
                    else{
                        const entity = await Entity.findOne({admin:admin._id},{
                            _id:0,
                            admin:0
                            // name:1,
                            // arabic_name:1,
                            // address:1,
                            // telephone:1,
                            // icon:1
                        });
                        const returns = {
                            username:admin.username,
                            email:admin.email,
                            gender:admin.gender,
                            profilePic:admin.profilePic,
                            role:admin.role,
                            entity,
                            token
                        };
                        return res.status(200).json(returns);
                    }
                }
                else{
                    throw Error("incorrect password");
                }
            }
        }
        else{
            res.status(400).json("missing data");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error.message);
    } 
};

exports.getemails = async (req, res, next) => {
    try {

        const emails = await User.find({face:true},{email:1,_id:0});
        
        list=[]
        for(let x in emails){
            list.push(emails[x].email);
        }
        //console.log(list)
        res.status(200).json(list); 
        
    } catch (error) {
        console.log(error);
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