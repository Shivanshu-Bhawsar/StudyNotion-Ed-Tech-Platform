import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/operations/authAPI";
import { FaArrowLeft } from "react-icons/fa6";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setemailSent] = useState(false);
  const [email, setemail] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setemailSent));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 text-lg leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 mt-8 text-sm leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="w-full rounded-lg bg-richblack-800 p-3 text-base text-richblack-5 font-medium shadow-[0_-1px_0_0_#FFFFFF2E_inset] placeholder:text-richblack-400 focus:outline-none"
                ></input>
              </label>
            )}
            <button
              type="submit"
              className="mt-5 w-full rounded-lg bg-yellow-50 p-3 text-base font-medium text-richblack-900"
            >
              {!emailSent ? "Reset Password" : "Resend email"}
            </button>
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
