import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { convertSecondsToDuration } from "../../../utils/secToDuration";

const tabsName = ["All", "Pending", "Completed"];

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(undefined);
  const [displayCourses, setDisplayCourses] = useState(undefined);
  const [progressData, setProgressData] = useState(undefined);
  const [displayProgressData, setDisplayProgressData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabsName[0]);

  const totalNoOfLectures = (course) => {
    let total = 0;
    for(const section of Object.values(course.courseContent)) {
      total += section.subSection.length;
    }
    return total;
  };

  const solve = (courseId) => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    return totalNoOfLectures(course);
  }

  useEffect(() => {
    const getEnrolledCourses = async () => {
      setLoading(true);
      const response = await getUserEnrolledCourses(token, dispatch);
      setLoading(false);
      setEnrolledCourses(response?.courses);
      setProgressData(response?.courseProgress);
      setDisplayCourses(response?.courses);
      setDisplayProgressData(response?.courseProgress);
    };
    getEnrolledCourses();
  }, []);

  const setMyCards = (value) => {
    setCurrentTab(value);
    if (value === "All") {
      setDisplayCourses(enrolledCourses);
      setDisplayProgressData(progressData);
    } 
    else if (value === "Pending") {
      const resultProgress = progressData.filter(
        (progress) => ((progress?.completedVideos?.length / solve(progress?.courseId)) * 100) !== 100);
      setDisplayProgressData(resultProgress);

      const resultCourses = [];
      for(const progress of resultProgress) {
        const course = enrolledCourses?.find((course) => course._id === progress?.courseId);
        resultCourses.push(course);
      }
      setDisplayCourses(resultCourses);
    }
    else {
      const resultProgress = progressData.filter(
        (progress) => ((progress?.completedVideos?.length / solve(progress?.courseId)) * 100) === 100);
      setDisplayProgressData(resultProgress);

      const resultCourses = [];
      for(const progress of resultProgress) {
        const course = enrolledCourses?.find((course) => course._id === progress?.courseId);
        resultCourses.push(course);
      }
      setDisplayCourses(resultCourses);
    }
  };

  const courseDuration = (courseDetails) => {
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((item) => {
        const timeDurationInSeconds = parseInt(item.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    return convertSecondsToDuration(totalDurationInSeconds);
  }
  
  if (loading) {
    return (
      <div className="h-[calc(100vh)] w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1000px]">
      <div className="text-3xl font-medium text-richblack-5">Enrolled Courses</div>

      {/* Tabs Name */}
      <div className="w-fit mt-8 flex items-center justify-center gap-1 rounded-full bg-richblack-800 px-2 py-1 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]">
        {tabsName.map((element, index) => (
          <div
            className={`text-[13px] lg:text-[16px] rounded-full transition-all duration-200 cursor-pointer
                ${
                  currentTab === element
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                } hover:bg-richblack-900 hover:text-richblack-5 text-center px-3 py-1 lg:px-5`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      {!displayCourses ? (
        <div>Loading...</div>
      ) : !displayCourses.length ? (
        <p className="h-[10vh] w-full mt-14 text-xl text-center text-richblack-5">
          You have not enrolled in any course yet
        </p>
      ) : (
        <div className="my-6 border border-richblack-700 rounded-t-lg">
          <div className="flex justify-between rounded-t-lg bg-richblack-700 py-3 text-base font-medium text-richblack-5">
            <p className="w-[40%] md:w-[45%] px-5">Course Name</p>
            <p className="w-[20%] md:w-[25%] px-2 md:ml-16">Duration</p>
            <p className="w-[30%] md:w-[20%] px-2">Progress</p>
          </div>

          {/* Cards shure hote h ab */}
          {displayCourses.map((course, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(
                  `/dashboard/enrolled-courses/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection[0]._id}`
                );
              }}
              className="flex items-center justify-between border-b border-richblack-700 rounded-none"
            >
              <div className="w-[40%] flex flex-col md:flex-row items- gap-5 p-4 cursor-pointer">
                <img
                  className="h-20 w-28 md:h-14 md:w-14 rounded-lg object-cover"
                  src={course.thumbnail}
                  alt="thumbnailImg"
                />
                <div className="max-w-xs flex flex-col gap-2">
                  <p className="text-sm md:text-base font-medium text-richblack-5">{course.courseName}</p>
                  <p className="hidden md:block text-xs text-richblack-300">
                    {
                      //description with max 50 characters
                      course.courseDescription.length > 50
                        ? course.courseDescription.slice(0, 50) + "...."
                        : course.courseDescription
                    }
                  </p>
                </div>
              </div>

              <div className="w-[20%] md:w-[25%] p-4 ml-10 text-base font-medium text-richblack-50">{courseDuration(course)}</div>

              <div className="w-[30%] md:w-[20%] h-full flex flex-col gap-5 p-4 text-white">
                {displayProgressData?.map((progress, index) => {
                  //show 0 progress if no progress data is available
                  if (progress?.courseId === course?._id) {
                    return (
                      <div key={index} className="flex flex-col gap-1">
                        <p className="text-xs font-semibold text-richblack-50">
                          {(progress?.completedVideos?.length /
                            totalNoOfLectures(course)) *
                            100 !== 100
                            ? `Progress ${
                                Math.floor((progress?.completedVideos?.length /
                                  totalNoOfLectures(course)) *
                                100)
                              }%`
                            : `Completed`}
                        </p>
                        <ProgressBar
                          completed={
                            (progress?.completedVideos?.length /
                              totalNoOfLectures(course)) *
                            100
                          }
                          total="10"
                          height="8px"
                          width="md:115px"
                          borderRadius="2000px"
                          bgColor={`${
                            (progress?.completedVideos?.length /
                              totalNoOfLectures(course)) *
                              100 ===
                            100
                              ? "#06D6A0"
                              : "#47A5C5"
                          }`}
                          baseBgColor="#2C333F"
                          isLabelVisible={false}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
