const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const Cart = require("../models/Cart");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");

exports.sendOTP = async (req,res) => {
    try{
        // fetch email from req body
        const {email} = req.body;

        // check if user is already exists
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        // generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);

        // check unique OTP or not
        const result = await OTP.findOne({otp});
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp});
        }

        // create an entry for new unique OTP in DB
        const otpBody = await OTP.create({email, otp});
        // console.log("otpBody: ", otpBody);

        // return successfull respone
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Error occured while sending OTP",
        });
    }
};

exports.signup = async (req,res) => {
    try{
        // fetch data from req body
        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;
        
        // validation of data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "Please fill all details carefully",
            });
        }

        // check password and confirmPassword value
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirmPassword value do not match, please enter carefully",
            });
        }
        
        // check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // find most recent OTP stored in DB
        const response = await OTP.find({email}).sort({createdAt: -1}).limit(1);

        // validate OTP
        if(response.length == 0){
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if(otp !== response[0].otp){
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user
        const approved = true;

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        // create entry for user in DB
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // create cart for user
        if(accountType === "Student") {
            await Cart.create({user: newUser._id, cartItems: []});
        }

        res.status(200).json({
            success: true,
            newUser,
            message: "User registered successfully",
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message,
            message: "User cannot be registered, please try again later"
        });
    }
};

exports.login = async (req,res) => {
    try{
        //data fetch
        const {email, password} = req.body;

        // data validation
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        // check user exist or not
        let user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first"
            });
        }

        // verify password & generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h", });
            // user = user.toObject();
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in successfully"
            });
        } 
        else{
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Login failure, please try again",
        });
    }
};

exports.changePassword = async (req,res) => {
    try{
        // fetch data from req body
        const {oldPassword, newPassword} = req.body;
        const id = req.user.id;

        // validation for user and old password
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }
        if(!await bcrypt.compare(oldPassword, user.password)){
            return res.status(401).json({
                success: false,
                message: "Current Password do not match",
            });
        }

        // update password in DB
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(id, {password: hashedPassword}, {new:true});

        // send mail - Password updated
        const emailResponse = await mailSender(
            user.email, 
            "Account Password Changed", 
            passwordUpdate(user.email, `${user.firstName} ${user.lastName}`),
        );

        // return response
        res.status(200).json({
            success: true,
            emailResponse,
            message: "Password Changed successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Change Password, please try again",
        });
    }
};