import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { formatDate } from "../../../../utils/formatDate";
import { COURSE_STATUS } from "../../../../utils/constants";
import { convertSecondsToDuration } from "../../../../utils/secToDuration"
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
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
    <>
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course?._id}
                className="flex gap-4 gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td colSpan={1} className="flex flex-col md:flex-row flex-1 gap-x-4 p-3">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1 justify-between">
                    <p className="mt-3 text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course?.courseDescription.split(" ")?.length > 30
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-xs text-white">
                      Created:{" "}
                      {formatDate(course?.createdAt || course?.updatedAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="w-fit flex items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-xs font-semibold text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="w-fit flex items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-xs font-semibold text-yellow-100">
                        <FaCheckCircle />
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {courseDuration(course)}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 mb-5">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler:
                          !loading && (() => handleCourseDelete(course._id)),
                        btn2Handler:
                          !loading && (() => setConfirmationModal(null)),
                      });
                    }}
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
