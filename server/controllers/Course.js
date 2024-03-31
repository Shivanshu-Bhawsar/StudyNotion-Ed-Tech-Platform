const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const { convertSecondsToDuration}= require("../utils/secToDuration");

exports.createCourse = async (req,res) => {
    try{
        // fetch data from req body
        let {courseName, courseDescription, whatYouWillLearn, price, tag, instructions, category, status} = req.body;

        // get thumbnail and userId
        const thumbnail = req.files.thumbnailImage;
        const userId = req.user.id;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag.length){
            return res.status(400).json({
                success: false,
                message: "Please enter all details carefully",
            });
        }

        if(!status || status === undefined) {
            status = "Draft";
        }

        // Convert the tag and instructions from stringified Array to Array
        tag = JSON.parse(tag);
        instructions = JSON.parse(instructions);

        // check given Category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        // upload image to cloudinary
        const thumbnailUpload = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_IMAGE);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: userId,
            whatYouWillLearn,
            price,
            tag,
            status,
            instructions,
            category,
            thumbnail: thumbnailUpload.secure_url,
        });

        // add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id: userId},
            { $push: {courses: newCourse._id} }, 
            {new: true},
        );

        // Add the new course to the Categories
        const updatedCategoryDetails = await Category.findByIdAndUpdate(
            {_id: category},
            { $push: {courses: newCourse._id} },
            {new:true},
        );
        // console.log("Updated Category: ", updatedCategoryDetails);

        // return response
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Create Course, please try again",
        });
    }
}

exports.getAllCourses = async (req,res) => {
    try{
        // fetch all Courses from DB
        const allCourses = await Course.find({})
        .populate({
            path: "instructor",
            select: "_id firstName lastName email accountType courses",
        })
        .exec();

        // return response
        res.status(200).json({
            success: true,
            allCourses,
            message: "All Courses returned successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Get All Courses, please try again",
        });
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        // fetch course details
        const {courseId} = req.body;
        const courseDetails = await Course.findOne(
            {_id: courseId})
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
    
        // validation
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }
    
        // return response
        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Course Details fetched successfully",
        });
    } 
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to fetch Course Details, please try again",
        });
    }
}

exports.getInstructorCourses = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Find all courses of the instructor
		const allCourses = await Course.find({ instructor: userId }).populate({
            path: "courseContent",
            populate: "subSection",
		});

		// Return all courses of the instructor
		res.status(200).json({
			success: true,
			data: allCourses,
            message: "Instructor Courses fetched successfully",
		});
	} 
    catch (error) {
		// Handle any errors that occur during the fetching of the courses
		return res.status(500).json({
			success: false,
			error: error.message,
            message: "Unable to fetch Instructor Courses, please try again",
		});
	}
}

exports.editCourse = async (req,res) => {
    try{
        // fetch data
        const {courseId} = req.body;
        const updates = req.body;

        // validation
        const course = await Course.findById(courseId);
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // If Thumbnail Image is found, update it
        if(req.files) {
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_IMAGE);
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Remove the course to the Category
        await Category.findByIdAndUpdate(
            {_id: course.category},
            { $pull: {courses: courseId} },
            {new:true},
        );

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updates[key]);
            } else {
                course[key] = updates[key];
            }
        }
        await course.save();

        // Add the course to the Category
        await Category.findByIdAndUpdate(
            {_id: course.category},
            { $push: {courses: courseId} },
            {new:true},
        );

        // updated course details
        const updatedCourse = await Course.findOne(
            {_id: courseId})
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // return response
        res.status(200).json({
            success: true,
            data: updatedCourse,
            message: "Course Created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to Update Course, please try again",
        });
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
    
        const courseDetails = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec();
    
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            });
        }
    
        const courseProgressCount = await CourseProgress.findOne({userId, courseId});
        // console.log("courseProgressCount : ", courseProgressCount);
    
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds;
            });
        });
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    
        res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : ["none"],
            },
            message: "Full Course Details fetched successfully",
        });
    } 
    catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to fetch Full Course Details, please try again",
        });
    }
};

exports.deleteCourse = async (req,res) => {
	try {
        // fetch data
        const {courseId} = req.body;

        // validation
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
    
        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        for(const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {$pull: {courses: courseId} });
        }
    
        // Delete sections and sub-sections of the course
        const courseSections = course.courseContent;
        for(const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId);
            if(section) {
                const subSections = section.subSection;
                for(const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }
            }
            // Delete the section
            await Section.findByIdAndDelete(sectionId);
        }

        //Delete course id from Category schema
        await Category.findByIdAndUpdate(course.category._id, {$pull: { courses: courseId }});
        
        //Delete course id from Instructor
        await User.findByIdAndUpdate(course.instructor._id, {$pull: { courses: courseId }});
    
        // Delete the course
        await Course.findByIdAndDelete(courseId);

        // return response
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
	}
    catch(error) {
        return res.status(500).json({
          success: false,
          error: error.message,
          message: "Unable to Delete Course, please try again",
        });
    }
}

exports.markLectureAsCompleted = async (req,res) => {
	try{
        // fetch data
        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;

        // validation
        if (!courseId || !subSectionId || !userId) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }

        // validate sub-section
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection) {
            return res.status(404).json({
                success: false,
                message: "Sub-Section Not Found",
            });
        }

        // fetch course progress
        const courseProgress = await CourseProgress.findOne({userId, courseId});
        if(!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress Not Found",
            });
        }

        // lecture is already completed
        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({
                success: false,
                message: "Lecture already marked as completed",
            });
        }

        // update completed videos
        courseProgress.completedVideos.push(subSectionId);
        await courseProgress.save();

        // return response
        return res.status(200).json({
            success: true,
            message: "Lecture marked as completed successfully",
        });
	} 
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to mark Lecture as completed, please try again"
        });
	}
}

// search course by title, description and tags
exports.searchCourse = async (req,res) => {
    try {
        // fetch data
        const { searchQuery } = req.body;

        // search course
        const courses = await Course.find({
            $or: [
                { courseName: { $regex: searchQuery, $options: "i" } },
                { courseDescription: { $regex: searchQuery, $options: "i" } },
                { tag: { $regex: searchQuery, $options: "i" } },
            ],
        })
        .populate("instructor")
        .populate("category")
        .populate("ratingAndReviews")
        .exec();
    
        // return response
        return res.status(200).json({
            success: true,
            data: courses,
        });
    } 
    catch(error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Unable to Search Course, please try again"
        });
    }
}