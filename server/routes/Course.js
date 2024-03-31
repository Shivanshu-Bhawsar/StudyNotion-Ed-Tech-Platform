const express = require("express");
const router = express.Router();

// importing routes
const { showAllCategories, createCategory, categoryPageDetails, getCategoryDetails } = require("../controllers/Category");
const { createSection, updateSection, deleteSection } = require("../controllers/Section");
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/Subsection");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");
const {
  createCourse, getAllCourses, getCourseDetails, getInstructorCourses, editCourse,
  deleteCourse, searchCourse, markLectureAsCompleted, getFullCourseDetails
} = require("../controllers/Course");
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// Course routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/updateCourseProgress", auth, isStudent, markLectureAsCompleted);
router.post("/searchCourse", searchCourse);

// Category routes
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);
// router.get("/getCategoryDetails", getCategoryDetails);

// Section and Sub-Section routes
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Rating and Review routes
router.post("/createRating", auth, isStudent, createRating);
// router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;