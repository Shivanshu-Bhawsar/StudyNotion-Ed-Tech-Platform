import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

const ResetPassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = location.pathname.split("/").at(-1);

  const { loading } = useSelector((state) => state.auth);
  const [resetComplete, setresetComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setformData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      dispatch(resetPassword(formData.password, formData.confirmPassword, token, setresetComplete));
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-10 ">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!resetComplete ? "Choose new password" : "Reset complete!"}
          </h1>
          <p className="my-4 text-lg leading-[1.625rem] text-richblack-100">
            {!resetComplete
              ? "Almost done. Enter your new password and you're all set."
              : "All done! We have sent an email to you to confirm."}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!resetComplete && (
              <div>
                <div className="relative mt-4">
                  <label className="w-full">
                    <p className="mb-1 mt-5 text-sm leading-[1.375rem] text-richblack-5">
                      New password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="w-full rounded-lg mt-1 bg-richblack-800 p-3 pr-12 text-base font-medium shadow-[0_-1px_0_0_#FFFFFF2E_inset] text-richblack-5"
                    />
                  </label>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-10 z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white"/>
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white"/>
                    )}
                  </span>
                </div>

                <div className="relative mt-4">
                  <label className="w-full">
                    <p className="mb-1 text-sm leading-[1.375rem] text-richblack-5">
                      Confirm new password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="w-full rounded-lg mt-1 bg-richblack-800 p-3 pr-12 text-base font-medium shadow-[0_-1px_0_0_#FFFFFF2E_inset] text-richblack-5"
                    />
                  </label>
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-10 z-[10] cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" color="white"/>
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" color="white"/>
                    )}
                  </span>
                </div>
              </div>
            )}

            {!resetComplete ? (
              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-yellow-50 p-3 text-base font-medium text-richblack-900"
              >
                Reset Password
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="mt-7 w-full rounded-lg bg-yellow-50 p-3 text-base font-medium text-richblack-900">
                  Return to login
                </button>
              </Link>
            )}
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
              <p className="flex items-center font-medium text-base gap-x-2 text-richblack-5">
                <FaArrowLeft />{" "}
                Back to login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
