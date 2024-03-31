const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async(req,res) => {
    try{
        // fetch data
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled: {$elemMatch: {$eq: userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the Course",
            });
        }

        // check if user is already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId});
        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course is already reviewed by the user",
            });
        }

        // create rating and review
        const ratingReview = await RatingAndReview.create({rating, review, course: courseId, user: userId});

        // update course with this rating and review
        await Course.findByIdAndUpdate(courseId, {$push: {ratingAndReviews: ratingReview._id}});

        // return response
        return res.status(200).json({
            success: true,
            ratingReview,
            message: "Rating and Review created successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            err: err.message,
            message: "Unable to Create Rating and Review, please try again",
        });
    }
}

// not used
exports.getAverageRating = async (req,res) => {
    try{
        // fetch data
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                },
            },
        ]);

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
                message: "Average Rating fetched successfully",
            });
        }

        // if no rating and review exists
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "Average Rating is 0, no ratings given till now",
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            err: err.message,
            message: "Unable to Get Average Rating, please try again",
        });
    }
}

exports.getAllRating = async (req,res) => {
    try{
      // fetch all rating and review
      const allRatingAndReview = await RatingAndReview.find({})
        .sort({ rating: "desc" })
        .populate({
          path: "user",
          select: "firstName lastName email image",
        })
        .populate({
          path: "course",
          select: "courseName",
        })
        .exec();

      // return response
      return res.status(200).json({
        success: true,
        data: allRatingAndReview,
        message: "All Rating and Review fetched successfully",
      });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            err: err.message,
            message: "Unable to Get All Rating, please try again",
        });
    }
}