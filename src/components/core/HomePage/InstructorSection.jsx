import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16">
      <div className="flex flex-col sm:flex-row gap-20 items-center">
        <div className="w-[70%] sm:w-[50%] sm:ml-10">
          <img
            src={Instructor}
            alt="instructor"
            className="shadow-[-1.3rem_-1rem_0_0_white]"
          />
        </div>

        <div className="w-[90%] sm:w-[50%] flex flex-col gap-5">
          <div className="text-4xl font-medium md:w-[50%]">
            Become an
            <HighlightText text={"instructor"} />
          </div>

          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit mt-8">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
