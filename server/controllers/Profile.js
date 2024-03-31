const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
const Cart = require("../models/Cart");
const RatingAndReview = require("../models/RatingAndReview");
const {uploadFileToCloudinary} = require("../utils/fileUploader");

exports.updateProfile = async (req,res) => {
    try{
        // fetch data
        const {dateOfBirth="", about="", contactNumber="", gender="", firstName, lastName} = req.body;
        const id = req.user.id;

        // validation
        if(!id){
            return res.status(400).json({
                success: false,
                message: "updateProfile properties missing",
            });
        }

        // you can also update user name in userSchema
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        // update profile
        userDetails.firstName = firstName || userDetails.firstName;
		userDetails.lastName = lastName || userDetails.lastName;
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.about = about || profile.about;
		profile.gender = gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

        await userDetails.save();
        if(firstName || lastName) {
            const image = `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.firstName} ${userDetails.lastName}`;
            userDetails.image = image;
        }
        // Save the updated profile
		await profile.save();
        await userDetails.save();

        // return response
            res.status(200).json({
            success: true,
            userDetails,
            profile,
            message: "Profile Updated successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Update Profile, please try again",
        });
    }
}

// explore: how we can schedule this deletion operation
exports.deleteAccount = async (req,res) => {
    try{
        // get id
        const id = req.user.id;

        // validation
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete(user.additionalDetails);

        // unenroll user from all enrolled courses
        for(const courseId of user.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                {$pull: {studentsEnrolled: id}},
                {new:true},
            );
        }

        // delete all progress of user
        for(const progressId of user.courseProgress) {
            await CourseProgress.findByIdAndDelete(progressId);
        }

        // delete all ratings of user
        const allRatings = await RatingAndReview.find({user: id});
        for(const rate of allRatings) {
            await Course.findByIdAndUpdate(
                rate.course,
                {$pull: {ratingAndReviews: rate._id}},
                {new:true},
            );
            await RatingAndReview.findByIdAndDelete(rate._id);
        }

        // delete cart of user
        await Cart.findOneAndDelete({user: id});

        // delete user
        await User.findByIdAndDelete({_id: id});

        // return response
        res.status(200).json({
            success: true,
            message: "User Account Deleted successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Delete Account, please try again",
        });
    }
}

exports.getUserDetails = async (req,res) => {
    try{
        // get id
        const id = req.user.id;

        // get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        res.status(200).json({
            success: true,
            userDetails,
            message: "User Data Fetched successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to fetch User Details, please try again",
        });
    }
}

exports.updateDisplayPicture = async (req,res) => {
	try {
        // fetch user id
		const id = req.user.id;

        // validation
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // fetch image and validate
        const image = req.files.profileImage;
        if(!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        // upload image to cloudinary
        const uploadDetails = await uploadFileToCloudinary(image, process.env.FOLDER_IMAGE);

        // update user schema
        const updatedImage = await User.findByIdAndUpdate({_id: id}, {image: uploadDetails.secure_url}, {new:true});

        // return response
        res.status(200).json({
            success: true,
            data: updatedImage,
            message: "Image updated successfully",
        }); 
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to Update Profile-Picture, please try again later",
        });   
    }
}

exports.instructorDashboard = async (req,res) => {
	try {
        // fetch user id
		const id = req.user.id;

        // fetch instructor courses details
		const courseDetails = await Course.find({instructor: id});
		const courseData = courseDetails.map((course) => {
			totalStudents = course.studentsEnrolled.length;
			totalRevenue = course.price * totalStudents;
            
			const courseStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
                coursePrice: course.price,
				totalStudents,
				totalRevenue,
			};
			return courseStats;
		});

        // return response
		res.status(200).json({
			success: true,
			data: courseData,
            message: "Instructor Data fetched successfully",
		});
	} 
    catch(error) {
		return res.status(500).json({
			success: false,
			error: error.message,
            message: "Unable to fetch Instructor Dashboard, please try again later",
		});
	}
}

exports.getEnrolledCourses = async (req,res) => {
    try {
        // fetch data
        const id = req.user.id;

        // validation
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // fetch enrolled courses
        const enrolledCourses = await User.findById(id).populate({
			path: "courses",
			populate: {
				path: "courseContent",
                populate: "subSection",
			},
		}).populate("courseProgress").exec();

        // return response
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } 
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to get Enrolled Courses, please try again"
        });
    }
}

exports.getAdminPanel = async (req,res) => {
	try {
        // fetch admin data
		const studentDetails = await User.find({accountType: "Student"});

        const instructorDetails = await User.find({accountType: "Instructor"});

        const categoryDetails = await Category.find().populate("courses");
		const categoryData = categoryDetails.map((category) => {
            totalCourses = category.courses.length;
            let totalStudents = 0, totalRevenue = 0;
            category.courses.forEach((course) => {
                students = course.studentsEnrolled.length;
                revenue = course.price * students;
                totalStudents += students;
                totalRevenue += revenue;
            });
            
			const categoryStats = {
				_id: category._id,
				name: category.name,
				description: category.description,
                totalCourses,
				totalStudents,
				totalRevenue,
			};
			return categoryStats;
		});

        // return response
		res.status(200).json({
			success: true,
			data: {
                categoryData,
                students: studentDetails.length,
                instructors: instructorDetails.length,
            },
            message: "Admin Data fetched successfully",
		});
	} 
    catch(error) {
		return res.status(500).json({
			success: false,
			error: error.message,
            message: "Unable to fetch Admin Panel, please try again later",
		});
	}
}

exports.getInstructorsDetails = async (req,res) => {
	try {
        // fetch user id
		const id = req.user.id;

        // validation
        const user = await User.findById(id);
        if(user.accountType !== "Admin") {
            return res.status(400).json({
                success: false,
                message: "This controller is only for Admin"
            });
        }

        // fetch instructor courses details
        const instructorDetails = await User.find({accountType: "Instructor"});
        
		const instructorData = await Promise.all(instructorDetails.map(async (item) => {
            const courseDetails = await Course.find({instructor: item._id});            
            let totalStudents = 0, totalRevenue = 0;
            for(courseData of courseDetails) {
                students = courseData.studentsEnrolled.length;
                revenue = courseData.price * students;
                totalStudents += students;
                totalRevenue += revenue;
            }
            
			const instructorStats = {
				_id: item._id,
                instructorImage: item.image,
				instructorName: `${item.firstName} ${item.lastName}`,
				instructorEmail: item.email,
                instructorCourses: item.courses.length,
				instructorStudents: totalStudents,
				instructorRevenue: totalRevenue,
                createdAt: item.createdAt,
			};
			return instructorStats;
		}));

        // return response
		res.status(200).json({
			success: true,
			data: instructorData,
            message: "Instructor Data fetched successfully",
		});
	} 
    catch(error) {
		return res.status(500).json({
			success: false,
			error: error.message,
            message: "Unable to fetch Instructor Details, please try again later",
		});
	}
}