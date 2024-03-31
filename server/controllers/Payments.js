const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");

exports.capturePayment = async (req,res) => {
    try{
        // fetch data
        const {courses} = req.body;
        const userId = req.user.id;

        // validation
        if(courses.length === 0){
            return res.status(400).json({
                success: false,
                message: "Please provide a valid courseId",
            });
        }

        // validate course and check student enrollment
        let totalAmount = 0;

        for(const courseId of courses) {
            let course;
            try{
                course = await Course.findById(courseId);
                if(!course){
                    return res.status(400).json({
                        success: false,
                        message: "Could not find the course",
                    });
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if(course.studentsEnrolled.includes(uid)) {
                    return res.status(400).json({
                        success: false,
                        message: `Student is already enrolled for the ${course.courseName} course`,
                    });
                }

                totalAmount += course.price;
            }
            catch(err) {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                });
            }
        }

        // order create
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString(),
        };

        try{
            // initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            // console.log("paymentResponse: ", paymentResponse);

            return res.status(200).json({
                success: true,
                data: paymentResponse,
                message: "Payment Captured Successfully"
            });
        }
        catch(err){
            return res.status(400).json({
                success: false,
                error: err.message,
                message: "Could not initiate order",
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Capture Payment, please try again",
        });
    }
};

const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide courses or userId",
        });
    }

    for(const courseId of courses) {
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId}},
                {new:true},
            );
            
            if(!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: `Course with id ${courseId} not found`,
                });
            }

            //set course progress for the course
            const newCourseProgress = new CourseProgress({userId, courseId, completedVideos: []});
            await newCourseProgress.save();

            // find the student and add the course to their enrolled courses list 
            const enrolledStudent = await User.findOneAndUpdate(
                {_id: userId},
                {$push: {
                    courses: courseId,
                    courseProgress: newCourseProgress._id,
                }},
                {new:true},
            );

            // send Course Enrollment confirmation email
            await mailSender(
                enrolledStudent.email,
                `You have successfully enrolled for ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                ),
            );
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "Unable to enroll the student. please try again",
            });
        }
    }
};

exports.verifySignature = async (req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(404).json({
            success: false,
            message: "Please provide all details",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature === razorpay_signature){
        // enroll the student in all courses
        await enrollStudents(courses, userId, res);

        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        });
    }

    return res.status(500).json({
        success: false,
        message: "Payment Failed",
    });
};

exports.sendPaymentSuccessEmail = async (req,res) => {
    try{
        // fetch data
        const {amount, paymentId, orderId} = req.body;
        const userId = req.user.id;

        // validation
        if(!amount || !paymentId || !orderId || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide valid payment details',
            });
        }

        // send mail
        try {
            const enrolledStudent = await User.findById(userId);
            await mailSender(
                enrolledStudent.email,
                `Study-Notion Payment Successfull`,
                paymentSuccessEmail(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),
            );
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                error: err.message,
                message: "Could not send Payment Success Email"
            });
        }
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error in sending Payment Success Email"
        });
    }
}