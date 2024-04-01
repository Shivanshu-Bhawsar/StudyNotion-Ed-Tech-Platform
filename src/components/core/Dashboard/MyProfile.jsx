import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { getCartData } from "../../../services/operations/profileAPI";

const MyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchCartData = async() => {
      await getCartData(token, dispatch);
    }
    if(user.accountType === "Student") {
      fetchCartData();
    }
  }, []);
  

  return (
    <div className="mx-auto w-10/12 sm:w-9/12 max-w-[1000px] flex flex-col gap-5 pb-7 md:pb-10 lg:pb-0">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      {/* section 1 */}
      <div className="p-3 md:p-8 md:px-12 flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] sm:w-[70px] rounded-full object-cover cursor-pointer"
          />
          <div className="space-y-1">
            <p className="text-xl font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="max-w-[220px] md:max-w-full text-xs md:text-sm font-medium text-richblack-300 break-words">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            editbtn={true}
          ></IconBtn>
        </div>
      </div>

      {/* section 2 */}
      <div className="p-6 md:p-8 md:px-12 flex justify-between rounded-md border border-richblack-700 bg-richblack-800">
        <div className="flex flex-col gap-12">
          <p className="text-xl font-semibold text-richblack-5">About</p>
          <p className="text-sm font-medium text-richblack-300">
            {user?.additionalDetails?.about ?? "Write something about Yourself"}
          </p>
        </div>

        <div>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
            editbtn={true}
          />
        </div>
      </div>

      {/* section 3 */}
      <div className="p-6 md:p-8 md:px-12 flex flex-col gap-y-10 rounded-md border border-richblack-700 bg-richblack-800">
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold text-richblack-5">
            Personal Details
          </p>
          <div>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
              editbtn={true}
            />
          </div>
        </div>

        <div className="max-w-[500px] flex flex-col md:flex-row gap-y-5 justify-between">
          <div className="flex flex-col gap-y-7">
            <div>
              <p className="mb-2 text-sm text-richblack-100">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-100">Email</p>
              <p className="text-sm font-medium text-richblack-5 break-words">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-100">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-7">
            <div>
              <p className="mb-2 text-sm text-richblack-100">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-100">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-100">Date of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
