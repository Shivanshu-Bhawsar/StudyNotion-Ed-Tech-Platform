const express = require("express");
const router = express.Router();

const {
  deleteAccount, updateProfile, getUserDetails, updateDisplayPicture, instructorDashboard, getEnrolledCourses, getAdminPanel, getInstructorsDetails
} = require("../controllers/Profile");
const { addToCart, removeFromCart, getCartData, resetCartData } = require("../controllers/Cart");
const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/auth");


router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateProfile", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.get("/getInstructorDashboardDetails", auth, isInstructor, instructorDashboard);
router.get("/getAdminPanelDetails", auth, isAdmin, getAdminPanel);
router.get("/getInstructorsDetails", auth, isAdmin, getInstructorsDetails);
router.post("/addToCart", auth, isStudent, addToCart);
router.put("/removeFromCart", auth, isStudent, removeFromCart);
router.get("/getCartData", auth, isStudent, getCartData);
router.put("/resetCartData", auth, isStudent, resetCartData);

module.exports = router;