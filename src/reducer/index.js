import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import loadingBarReducer from "../slices/loadingBarSlice";
import viewCourseReducer from "../slices/viewCourseSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    loadingBar: loadingBarReducer,
    viewCourse: viewCourseReducer,
});

export default rootReducer;