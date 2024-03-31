import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { FaChevronLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaAngleDoubleRight } from "react-icons/fa";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [activeSubSection, setActiveSubSection] = useState("");
  const { courseId, sectionId, subsectionId } = useParams();
  const {courseSectionData, courseEntireData, completedLectures, totalNoOfLectures} = useSelector(state => state.viewCourse);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return;
      
      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (subSection) => subSection?._id === subsectionId
      );
      const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
      setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
      setActiveSubSection(activeSubSectionId);
    })()
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className={`${!showSidebar && "hidden"} w-6 relative`}>
        <FaAngleDoubleRight
          onClick={() => {
            setShowSidebar(false);
          }}
          className={`md:hidden z-10 absolute top-3 -left-1 m-2 text-2xl text-richblack-900 bg-richblack-100 rounded-full p-1 cursor-pointer`}
        />
      </div>

      <div
        className={`${
          showSidebar && "hidden"
        } transition-all origin-right duration-500 flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800`}
      >
        <div
          className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-5 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25"
        >
          <div className="w-full flex items-center justify-between">
            <div className="h-[35px] w-[35px] flex items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90">
              <FaChevronLeft
                className="cursor-pointer md:hidden"
                onClick={() => {
                  setShowSidebar(true);
                }}
              />
              <FaChevronLeft
                className="cursor-pointer hidden md:block"
                onClick={() => {
                  navigate(`/dashboard/enrolled-courses`);
                }}
              />
            </div>
            <IconBtn text="Add Review" onclick={() => setReviewModal(true)} />
          </div>
          <div className="mt-5 flex flex-col gap-[2px]">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} of {totalNoOfLectures} Lectures
              Completed
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto px-2">
          {courseSectionData?.map((section, index) => (
            <details
              key={index}
              className="appearance-none text-richblack-5 detailanimatation"
            >
              <summary className="mt-2 cursor-pointer text-sm text-richblack-5 appearance-none">
                <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                  <p className="w-[70%] font-semibold">
                    {section?.sectionName}
                  </p>
                  <div className="flex items-center gap-3">
                    <MdOutlineKeyboardArrowDown className="arrow" />
                  </div>
                </div>
              </summary>
              {section?.subSection.map((subSection) => (
                <div
                  key={subSection?._id}
                  onClick={() => {
                    navigate(
                      `/dashboard/enrolled-courses/view-course/${courseId}/section/${section?._id}/sub-section/${subSection?._id}`
                    );
                    setActiveSubSection(subSection?._id);
                  }}
                  className={`${
                    activeSubSection === subSection?._id
                      ? "bg-yellow-200"
                      : "bg-richblack-50"
                  } cursor-pointer items-baseline flex gap-3  px-5 py-2 font-semibold text-richblack-800 relative border-b-[1px] border-richblack-600 transition-[height] duration-500 ease-in-out`}
                >
                  <div className="checkbox-wrapper-19 absolute bottom-2">
                    <input
                      type="checkbox"
                      readOnly={true}
                      checked={completedLectures?.includes(subSection?._id)}
                    />
                    <label className="check-box"></label>
                  </div>
                  <p className="ml-6 font-medium">{subSection?.title}</p>
                </div>
              ))}
            </details>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
