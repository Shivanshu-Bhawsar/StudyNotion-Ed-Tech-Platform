import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

const CourseCard = ({ course, Height, Width }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div className="mb-4 hover:scale-[1.03] transition-all duration-200">
      <Link to={`/courses/${course._id}`}>
        <div>
          <div>
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} ${Width} rounded-lg object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-base text-richblack-300">
                By {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-yellow-100 text-base font-semibold">{avgReviewCount || 3.5}</span>
              <RatingStars Review_Count={3.5} />
              <span className="hidden md:block text-sm lg:text-base text-richblack-400">
                ({course?.ratingAndReviews?.length} ratings)
              </span>
            </div>
            <p className="text-xl font-semibold text-richblack-5">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
