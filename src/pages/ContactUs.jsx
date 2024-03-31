import React from "react";
import ContactUsForm from "../components/contactUs/ContactUsForm";
import RatingSlider from "../components/common/RatingSlider";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

const ContactUs = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto">
      <div className="mx-auto mt-20 w-11/12 max-w-maxContent flex flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            <div className="flex gap-[10px] p-3 text-sm text-richblack-100">
              <div>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="25"
                  width="25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z"></path>
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z"></path>
                </svg>
              </div>
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-lg font-semibold text-richblack-5">
                  Chat on us
                </h1>
                <p className="font-medium text-richblack-200">
                  Our friendly team is here to help.
                </p>
                <p className="font-semibold text-richblack-200">
                  info@studynotion.com
                </p>
              </div>
            </div>

            <div className="flex gap-[10px] p-3 text-sm text-richblack-100">
              <div>
                <FaGlobeAmericas className="text-[24px]" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-lg font-semibold text-richblack-5">
                  Visit us
                </h1>
                <p className="font-medium text-richblack-200">
                  Come and say hello at our office HQ.
                </p>
                <p className="font-semibold text-richblack-200">
                  Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                  Bangalore-560016
                </p>
              </div>
            </div>

            <div className="flex gap-[10px] p-3 text-sm text-richblack-100">
              <div>
                <IoCall className="text-[24px]" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <h1 className="text-lg font-semibold text-richblack-5">
                  Call us
                </h1>
                <p className="font-medium text-richblack-200">
                  Mon - Fri From 8am to 5pm
                </p>
                <p className="font-semibold text-richblack-200">
                  +91 6366 000 666
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[60%]">
          <div className="border border-richblack-600 rounded-xl p-7 lg:p-[52px] flex gap-10 flex-col">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl leading-[44px] tracking-tighter font-semibold text-richblack-5">
                Got a Idea? We've got the skills. Let's team up
              </h1>
              <p className="text-base font-medium text-richblack-300">
                Tell us more about yourself and what you're got in mind.
              </p>
            </div>
            <div>
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-28 w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 bg-richblack-900 text-white">
        <h1 className="mt-8 text-center text-4xl font-semibold text-richblack-5 tracking-tight">
          Reviews from other learners
        </h1>
        <div className="w-full">
          <RatingSlider />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
