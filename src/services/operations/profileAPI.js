import { apiConnector } from "../apiConnector";
import { profileEndpoints, settingsEndpoints } from "../apis";
import { setProgress } from "../../slices/loadingBarSlice.js";
import { setTotalItems, setCart, setTotal } from "../../slices/cartSlice.js";
import { toast } from "react-hot-toast";
import { logout } from "./authAPI.js";


// getUserEnrolledCourses
export async function getUserEnrolledCourses(token, dispatch) {
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("GET_USER_ENROLLED_COURSES_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId)
  return result;
}

//updateProfilePicture
export async function updatePfp(token, profileImage){
  const toastId = toast.loading("Uploading...");
  try {
    // // console.log("profileImage", profileImage);
    const formData = new FormData();
    formData.append('profileImage', profileImage);

    const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    // console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile Picture Updated Successfully");
    const imageUrl = response.data.data.image;
    localStorage.setItem("user", JSON.stringify({...JSON.parse(localStorage.getItem("user")), image:imageUrl}));
  } catch (error) {
    // console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

//updateAdditionalDetails
export async function updateAdditionalDetails(token, additionalDetails){
    // console.log("additionalDetails",additionalDetails);
    const {firstName, lastName, dateOfBirth, gender, contactNumber, about} = additionalDetails;
    const toastId = toast.loading("Updating...");
    try {
      const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, {firstName,lastName,dateOfBirth,gender,contactNumber,about},{
        Authorization: `Bearer ${token}`,
      });
      // console.log("UPDATE_ADDITIONAL_DETAILS_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Additional Details Updated Successfully");
      const user = JSON.parse(localStorage.getItem("user"));
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.additionalDetails.dateOfBirth = dateOfBirth  || user.additionalDetails.dateOfBirth;
      user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
      user.additionalDetails.about = about || user.additionalDetails.about;
      user.additionalDetails.gender = gender;
      localStorage.setItem("user", JSON.stringify(user));

    } catch (error) {
      // console.log("UPDATE_ADDITIONAL_DETAILS_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}

//updatePassword
export async function updatePassword(token,password){
  const { oldPassword, newPassword } = password;
  // console.log("password: ", password);
  const toastId = toast.loading("Updating...");
  try {
    const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API, {oldPassword, newPassword},{
      Authorization: `Bearer ${token}`,
    });
    // console.log("UPDATE_PASSWORD_API API RESPONSE............", response);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Updated Successfully");
  }
  catch (error) {
    // console.log("UPDATE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

//deleteAccount
export const deleteAccount = (token, navigate) => async (dispatch) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,null,{
      Authorization: `Bearer ${token}`,
    });
    // console.log("DELETE_ACCOUNT_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Account Deleted Successfully");
    dispatch(logout(navigate));
  }
  catch (error) {
    // console.log("DELETE_ACCOUNT_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId);
}

//get instructor dashboard
export async function getInstructorDashboard(token,dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_ALL_INSTRUCTOR_DASHBOARD_DETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("GET_INSTRUCTOR_DASHBOARD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data;
  } catch (error) {
    // console.log("GET_INSTRUCTOR_DASHBOARD_API API ERROR............", error)
    toast.error("Could Not Get Instructor Dashboard")
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
  return result;
}

//get admin panel
export async function getAdminPanel(token,dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_ADMIN_PANEL_DETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("GET_ADMIN_PANEL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("GET_ADMIN_PANEL_DETAILS_API API ERROR............", error);
    toast.error("Could Not Get Admin Panel");
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
  return result;
}

//get instructors details
export async function getInstructorsDetails(token,dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_INSTRUCTORS_DETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("GET_INSTRUCTORS_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    // console.log("GET_INSTRUCTORS_DETAILS_API API ERROR............", error);
    toast.error("Could Not Get Admin Panel");
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
  return result;
}

// add to cart
export async function addToCart(courseId, token, dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      profileEndpoints.ADD_TO_CART_API,
      {courseId},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("ADD_TO_CART_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course added to cart");
    result = response.data.data;
    dispatch(setTotalItems(result?.updatedCart?.cartItems.length));
    dispatch(setCart(result?.updatedCart?.cartItems));
    dispatch(setTotal(result?.total));
  } catch (error) {
    // console.log("ADD_TO_CART_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
}

// remove from cart
export async function removeFromCart(courseId, token, dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "PUT",
      profileEndpoints.REMOVE_FROM_CART_API,
      {courseId},
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("REMOVE_FROM_CART_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course removed from cart");
    result = response.data.data;
    dispatch(setTotalItems(result?.updatedCart?.cartItems.length));
    dispatch(setCart(result?.updatedCart?.cartItems));
    dispatch(setTotal(result?.total));
  } catch (error) {
    // console.log("REMOVE_FROM_CART_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
}

// fetch cart data
export async function getCartData(token, dispatch){
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profileEndpoints.GET_CART_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log("GET_CART_DATA_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
    dispatch(setTotalItems(result?.cartDetails?.cartItems.length));
    dispatch(setCart(result?.cartDetails?.cartItems));
    dispatch(setTotal(result?.total));
  } catch (error) {
    // console.log("GET_CART_DATA_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
}