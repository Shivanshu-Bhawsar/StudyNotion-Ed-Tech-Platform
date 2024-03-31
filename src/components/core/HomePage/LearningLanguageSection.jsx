import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "../HomePage/Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-28 sm:mt-32 mb-32">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center tracking-tighter sm:tracking-tight">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>

        <div className="mx-auto mb-5 sm:mb-0 sm:-mt-2 text-center text-richblack-700 text-base font-medium lg:w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center mb-3">
          <img
            src={know_your_progress}
            alt="KNowYourProgressImage"
            className="object-contain lg:-mr-32"
          />
          <img
            src={compare_with_others}
            alt="KNowYourProgressImage"
            className="object-contain lg:-mr-32"
          />
          <img
            src={plan_your_lesson}
            alt="KNowYourProgressImage"
            className="object-contain lg:-ml-6"
          />
        </div>

        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
