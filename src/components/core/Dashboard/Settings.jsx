import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAdditionalDetails, updatePassword, updatePfp, deleteAccount } from '../../../services/operations/profileAPI'
import ConfirmationModal from "../../common/ConfirmationModal";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const [confirmationModal, setConfirmationModal] = useState(null);

  //update profile picture
  const pfp = useSelector((state) => state.profile.user.image);
  const [profilePicture, setprofilePicture] = useState(pfp);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setprofilePicture(URL.createObjectURL(file));
  };

  //update additional info
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    about: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  //update password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleOnChangePassword = (e) => {
    setPassword((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    updatePfp(token, file);
  };

  const handelAdditionalDetails = (e) => {
    e.preventDefault();
    updateAdditionalDetails(token, formData);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    updatePassword(token, password);
  };

  const cancelChange = (e) => { 
    e.preventDefault();
    document.getElementById("create-course-form").reset();
    setPassword(() => ({oldPassword:"" , newPassword:""}));
  }

  return (
    <div className="overflow-auto">
      <div className="mx-auto w-10/12 sm:w-9/12 max-w-[1000px] flex flex-col gap-5 pb-7 md:pb-10 lg:pb-0">
        <h1 className="mb-8 text-3xl font-medium text-richblack-5">
          Edit Profile
        </h1>

        {/* update profile picture */}
        <div className="p-3 md:p-8 md:px-12 flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 text-richblack-5">
          <div className="flex items-center gap-x-4">
            <img
              className="aspect-square w-[50px] sm:w-[70px] rounded-full object-cover cursor-pointer"
              src={profilePicture}
              alt="profilePic"
            ></img>

            <div className="space-y-3">
              <p className="text-base font-semibold text-richblack-5">
                Change Profile Picture
              </p>
              <form onSubmit={handleUpload}>
                <div className="flex flex-row gap-3">
                  <label
                    className="py-2 px-3 sm:py-2 sm:px-5 rounded-md bg-richblack-700 font-semibold text-richblack-50 cursor-pointer"
                    htmlFor="upload"
                  >
                    Select
                    <input
                      id="upload"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </label>
                  <button
                    type="submit"
                    className="p-2 sm:py-2 sm:px-5 flex items-center justify-center gap-x-1 bg-yellow-50 rounded-md font-semibold text-richblack-900 cursor-pointer"
                  >
                    Upload<MdOutlineFileUpload size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* update additional info */}
        <form onSubmit={handelAdditionalDetails} id="create-course-form">
          <div className="p-6 md:p-8 md:px-12 flex flex-col gap-y-8 rounded-md border border-richblack-700 bg-richblack-800">
            <h2 className="text-lg font-semibold text-richblack-5">
              Profile Information
            </h2>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="firstName" className="lable-style">
                    First Name
                  </label>
                  <input
                    defaultValue={user.firstName || null}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter first name"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="lastName" className="lable-style">
                    Last Name
                  </label>
                  <input
                    defaultValue={user.lastName || null}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter first name"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="dateOfBirth" className="lable-style">
                    Date of Birth
                  </label>
                  <input
                    defaultValue={user?.additionalDetails.dateOfBirth || null}
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="gender" className="lable-style">
                    Gender
                  </label>
                  <select
                    defaultValue={user?.additionalDetails.gender || null}
                    type="text"
                    name="gender"
                    id="gender"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  >
                    <option value="Prefer not to say">Prefer not to say</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="contactNumber" className="lable-style">
                    Contact Number
                  </label>
                  <input
                    defaultValue={user?.additionalDetails.contactNumber || null}
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    placeholder="Enter Contact Number"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="about" className="lable-style">
                    About
                  </label>
                  <input
                    defaultValue={user?.additionalDetails.about || null}
                    type="text"
                    name="about"
                    id="about"
                    placeholder="Enter Bio Details"
                    className="form-style !bg-richblack-700"
                    onChange={handleOnChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5 gap-5">
            <button
              onClick={cancelChange}
              className="py-2 px-5 bg-richblack-800 rounded-md font-semibold text-richblack-5 transition-all duration-200 hover:scale-95 hover:shadow-none cursor-pointer shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset]"
            >
              Cancel
            </button>
            <button
              className="py-2 px-5 bg-yellow-50 rounded-md font-semibold text-richblack-900 cursor-pointer transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>

        {/* update Password */}
        <form onSubmit={handlePassword}>
          <div className="p-6 md:p-8 md:px-12 mt-7 flex flex-col gap-y-8 rounded-md border border-richblack-700 bg-richblack-800">
            <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="relative flex flex-col gap-2 w-full">
                <label htmlFor="oldPassword" className="lable-style">
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Current Password <sup className="text-pink-200">*</sup>
                  </p>
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  value={password.oldPassword}
                  onChange={handleOnChangePassword}
                  placeholder="Enter Password"
                  className="form-style !bg-richblack-700 w-full"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-10 z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible
                      fontSize={24}
                      fill="#AFB2BF"
                      color="white"
                    />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                  )}
                </span>
              </div>

              <div className="relative flex flex-col gap-2 w-full">
                <label htmlFor="newPassword" className="lable-style">
                  <p className="text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Change Password <sup className="text-pink-200">*</sup>
                  </p>
                </label>
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  value={password.newPassword}
                  onChange={handleOnChangePassword}
                  placeholder="Enter Password"
                  className="form-style !bg-richblack-700 w-full"
                />

                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-10 z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible
                      fontSize={24}
                      fill="#AFB2BF"
                      color="white"
                    />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white" />
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5 gap-5">
            <button
              onClick={cancelChange}
              className="py-2 px-5 bg-richblack-800 rounded-md font-semibold text-richblack-5 transition-all duration-200 hover:scale-95 hover:shadow-none cursor-pointer shadow-[-2px_-2px_0px_0px_#FFFFFF1A_inset]"
            >
              Cancel
            </button>
            <button
              className="py-2 px-5 bg-yellow-50 rounded-md font-semibold text-richblack-900 cursor-pointer transition-all duration-200 hover:scale-95"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>

        {/* Delete Account */}
        <div className="mt-7 p-4 md:p-8 md:px-12 flex flex-row gap-x-5 rounded-md border border-pink-700 bg-pink-900">
          <div className="aspect-square h-14 w-14 flex items-center justify-center rounded-full bg-pink-700">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-3xl text-pink-200"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete Account
            </h2>
            <div className="md:w-3/5 text-pink-25">
              <p>Would you like to delete account?</p>
              <p>
                This account may include Paid Courses. Deleting your account is
                permanent and will remove all the content associated with it.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "Your account will be deleted",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  deletebtn: true,
                  btn1Handler: () =>
                    dispatch(deleteAccount(token, navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="w-fit cursor-pointer italic text-pink-300"
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Settings;
