import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminPanel } from "../../../../services/operations/profileAPI";
import DashboardChart from "./DashboardChart";

const InstructorDashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [adminData, setAdminData] = useState([]);
  const [currentChart, setCurrentChart] = useState("revenue");
  const [instructors, setInstructors] = useState(0);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    const getDataWithStats = async () => {
      const adminDetails = await getAdminPanel(token, dispatch);
      if (adminDetails.categoryData.length) {
        setAdminData(adminDetails.categoryData);
      }
      setStudents(adminDetails.students);
      setInstructors(adminDetails.instructors);
    };
    getDataWithStats();
  }, []);

  const totalCourses = adminData?.reduce((acc, category) => acc + category?.totalCourses, 0);
  const totalEarnings = adminData?.reduce((acc, category) => acc + category?.totalRevenue, 0);
  const totalStudents = adminData?.reduce((acc, category) => acc + category?.totalStudents, 0);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-3 sm:py-7">
      <div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        <div className="my-4 flex flex-col-reverse gap-3 md:flex-row md:h-[450px] md:space-x-4">
          <div className="flex flex-col flex-1 rounded-md bg-richblack-800 p-6">
            <div className="flex items-center justify-between gap-[10px]">
              <p className="text-xl font-bold text-richblack-5">Visualize</p>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => setCurrentChart("revenue")}
                  className={`px-2 py-2 rounded-md ${
                    currentChart === "revenue"
                      ? "bg-richblack-900 text-yellow-100"
                      : "bg-richblack-800 text-richblack-100"
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setCurrentChart("students")}
                  className={`px-2 py-2 rounded-md ${
                    currentChart === "students"
                      ? "bg-richblack-900 text-yellow-100"
                      : "bg-richblack-800 text-richblack-100"
                  }`}
                >
                  Students
                </button>
              </div>
            </div>
            <DashboardChart
              categories={adminData}
              currentChart={currentChart}
            />
          </div>
          <div className="min-w-[250px] flex flex-col rounded-md bg-richblack-800 p-6">
            <p className="text-xl font-bold text-richblack-5">Statistics</p>
            <div className="mt-4 space-y-5">
              <div>
                <p className="text-lg text-richblack-200">Total Instructors</p>
                <p className="text-2xl font-semibold text-richblack-50">
                  {instructors}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Courses</p>
                <p className="text-2xl font-semibold text-richblack-50">
                  {totalCourses}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Students</p>
                <p className="text-2xl font-semibold text-richblack-50">
                  {students} : {totalStudents}
                </p>
              </div>
              <div>
                <p className="text-lg text-richblack-200">Total Earnings</p>
                <p className="text-2xl font-semibold text-richblack-50">
                  Rs. {totalEarnings}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
