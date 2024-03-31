const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { passwordUpdate } = require("../mail/templates/passwordUpdate");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req,res) => {
    try{
        // fetch email from req body
        const email = req.body.email;

        // email validation
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User is not registered",
            });
        }

        // generate token
        // const token = crypto.randomUUID();
        const token = crypto.randomBytes(20).toString("hex");

        // update user details by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email}, 
            {
                token: token,
                resetPasswordExpires: Date.now() + 3600000,
            }, 
            {new: true});

        // create url
        const url = `https://localhost:3000/update-password/${token}`;

        // send mail containing url
        await mailSender(
            email, 
            "Password Reset Link", 
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );

        return res.status(200).json({
            success: true,
            updatedDetails,
            message: "Reset Password Email sent successfully, please check your email",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while sending reset password mail",
        });
    }
};

exports.resetPassword = async (req,res) => {
    try{
        // fetch data from req body
        const {password, confirmPassword, token} = req.body;

        // validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password and confirmPassword does not match",
            });
        }

        // get user details from DB using token
        const userDetails = await User.findOne({token});
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        // check token expiration time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success: false,
                message: "Token is expired, please regenerate your token",
            });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // password update
        await User.findOneAndUpdate({token}, {password: hashPassword}, {new:true});

        // send mail
        await mailSender(
            userDetails.email, 
            "Password Reset Successfully", 
            passwordUpdate(userDetails.email, `${userDetails.firstName} ${userDetails.lastName}`),
        );

        // return response
        return res.status(200).json({
            success: true,
            message: "Password Reset successfully, You can check it by login again",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Reset Password, please try again",
        });
    }
}