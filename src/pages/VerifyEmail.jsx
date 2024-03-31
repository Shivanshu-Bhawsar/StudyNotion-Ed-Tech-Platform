import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp } from "../services/operations/authAPI";
import { FaArrowLeft } from "react-icons/fa6";
import { RxCounterClockwiseClock } from "react-icons/rx";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { loading, signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      email,
      accountType,
      confirmPassword,
      password,
      lastName,
      firstName,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  const resendOtp = (e) => {
    dispatch(sendOtp(signupData.email, navigate));
  };

  return loading ? (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="custom-loader"></div>
    </div>
  ) : (
    <div>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify email
          </h1>
          <p className="text-lg leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              placeholder="------"
              inputStyle="rounded-lg text-4xl p-2 text-center text-richblack-5 font-medium bg-richblack-800 shadow-[0_-1px_0_0_#FFFFFF2E_inset]"
              isInputNum={true}
              shouldAutoFocus={true}
              containerStyle="flex justify-between"
              renderInput={(props) => <input {...props} />}
            />
            <button
              type="submit"
              className="w-full mt-6 rounded-lg bg-yellow-50 p-3 text-base font-medium text-richblack-900"
            >
              Verify email
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to={"/signup"}>
              <p className="flex items-center font-medium text-base gap-x-2 text-richblack-5">
                <FaArrowLeft />{" "}
                Back to signup
              </p>
            </Link>
            <button onClick={resendOtp} to={"/signup"}>
              <p className="flex items-center font-medium text-base gap-x-2 text-blue-100">
                <RxCounterClockwiseClock className="text-xl" />{" "}
                Resend it
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
