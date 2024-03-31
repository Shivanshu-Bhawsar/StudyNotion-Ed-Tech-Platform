import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { getInstructorsDetails } from "../../../../services/operations/profileAPI";
import { formatDate } from "../../../../utils/formatDate";

export default function InstructorDetails() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [instructors, setInstructors] = useState(null);

  useEffect(() => {
    const fetchInstructorsDetails = async () => {
      setLoading(true);
      const res = await getInstructorsDetails(token, dispatch);
      setInstructors(res);
      setLoading(false);
    };
    fetchInstructorsDetails();
  }, []);

  if (loading) {
    return <div className="custom-loader"></div>;
  }

  return (
    <>
      <div className="mx-auto w-11/12 max-w-[1000px] pb-10 lg:pb-0">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-medium text-richblack-5">Instructors Details</h1>
        </div>
        <div>
          <Table className="rounded-xl border border-richblack-800">
            <Thead>
              <Tr className="flex justify-between md:items-center md:justify-center gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100">
                <Th className="sm:w-[40%] md:w-[46%] md:pl-12 text-left text-sm font-medium uppercase text-richblack-100">
                  Instructors
                </Th>
                <Th className="md:w-[18%] text-center text-sm font-medium uppercase text-richblack-100">
                  Courses
                </Th>
                <Th className="md:w-[18%] text-center text-sm font-medium uppercase text-richblack-100">
                  Students
                </Th>
                <Th className="md:w-[18%] text-center text-sm font-medium uppercase text-richblack-100">
                  Revenue
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {instructors?.length === 0 ? (
                <Tr>
                  <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                    No instructor found
                  </Td>
                </Tr>
              ) : (
                instructors?.map((instructor) => (
                  <Tr
                    key={instructor?._id}
                    className="flex gap-4 justify-between gap-x-10 border-b border-richblack-800 px-6 py-8 md:items-center md:justify-center"
                  >
                    <Td
                      colSpan={1}
                      className="sm:w-[40%]  md:w-[46%] flex md:items-center md:justify-center flex-col md:flex-row gap-x-4 p-3"
                    >
                      <img
                        src={instructor?.instructorImage}
                        alt={instructor?.instructorName}
                        className="h-14 w-14 aspect-video rounded-full object-cover"
                      />
                      <div className="flex flex-col gap-1 justify-between">
                        <p className="mt-3 text-lg font-semibold text-richblack-5">
                          {instructor.instructorName}
                        </p>
                        <p className="text-xs text-richblack-300">
                          {instructor?.instructorEmail}
                        </p>
                        <p className="text-xs text-white">
                          Created: {formatDate(instructor?.createdAt)}
                        </p>
                      </div>
                    </Td>
                    <Td className="md:w-[18%] text-center text-sm font-medium text-richblack-100 mb-5">
                      {instructor?.instructorCourses}
                    </Td>
                    <Td className="md:w-[18%] text-center text-sm font-medium text-richblack-100 mb-5">
                      {instructor?.instructorStudents}
                    </Td>
                    <Td className="md:w-[18%] text-center text-sm font-medium text-richblack-100 mb-5">
                      {instructor?.instructorRevenue}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
