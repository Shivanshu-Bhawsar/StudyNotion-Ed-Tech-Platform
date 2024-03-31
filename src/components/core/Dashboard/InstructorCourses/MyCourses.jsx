import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import CoursesTable from "./CoursesTable";
import IconBtn from "../../../common/IconBtn";
import { AiOutlinePlusCircle } from "react-icons/ai";

const MyCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchedCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
    };
    fetchedCourses();
  }, []);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] pb-10 lg:pb-0">
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <AiOutlinePlusCircle size={20} />
        </IconBtn>
      </div>
      <div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
      </div>
    </div>
  );
};

export default MyCourses;
