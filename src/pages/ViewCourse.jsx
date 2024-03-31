import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ReviewModal from "../components/core/ViewCourse/ReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

const ViewCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    const setCourseSpecifics = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((section) => {
        lectures += section?.subSection?.length;
      });
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecifics();
  }, [courseId, token, dispatch]);

  return (
    <div className="flex w-screen">
      <div className="">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>
      <div>
        <Outlet />
      </div>
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
