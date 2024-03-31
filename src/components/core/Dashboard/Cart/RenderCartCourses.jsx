import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";
import { removeFromCart } from "../../../../services/operations/profileAPI";
import { RiDeleteBin6Line } from "react-icons/ri";

const RenderCartCourses = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  
  const getRating = (course) => {
    if (course?.ratingAndReviews?.length > 0) {
      const count = GetAvgRating(course?.ratingAndReviews);
      return count;
    }
    return 0;
  }

  const removeItemFromCart = async (courseId) => {
    await removeFromCart(courseId, token, dispatch);
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      {cart.map((course, index) => (
        <div
          key={index}
          className="w-full pb-6 flex flex-wrap items-start justify-between gap-5 border-b border-b-richblack-700"
        >
          <div className="flex flex-1 md:w-[80%] flex-col gap-3 lg:flex-row">
            <Link to={`/courses/${course._id}`}>
              <img
                className="h-[130px] w-[185px] rounded-lg object-cover"
                src={course?.thumbnail}
                alt="thumbnailImg"
              />
            </Link>
            <div className="md:w-[70%] flex flex-col gap-2">
              <Link to={`/courses/${course._id}`}>
                <p className="text-lg font-medium text-richblack-5">
                  {course.courseName}
                </p>
              </Link>
              <Link to={`/courses/${course._id}`}>
                <p className="text-sm text-richblack-300">
                  {/* {course?.courseDescription.split(" ").length > 18 ? `${course?.courseDescription.split(" ").splice(0, 18).join(" ")}...` : `${course?.courseDescription}`} */}
                  {course.courseDescription.length > 100
                        ? course.courseDescription.slice(0, 100) + "...."
                        : course.courseDescription}
                </p>
              </Link>

              <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-yellow-100">
                  {getRating(course)}
                </span>
                <RatingStars Review_Count={getRating(course)} />
                <span className="text-base text-richblack-400">
                  {course?.ratingAndReviews?.length} ratings
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-5">
            <button
              className="p-2 flex items-center gap-1 rounded-lg border border-richblack-700 bg-richblack-800 text-pink-200 text-base font-medium"
              onClick={() => removeItemFromCart(course._id)}
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="text-2xl font-semibold text-yellow-50">
              ₹ {course?.price}{" "}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderCartCourses;
