import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 items-center">
      <div className="lg:w-[45%] flex flex-col gap-5 p-3 lg:p-0">
        {timeline.map((element, index) => {
          return (
            <div key={index}>
              <div className="flex gap-6">
                <div className="w-[50px] h-[50px] bg-white rounded-full shadow-[0px_0px_62px_0px_#0000001F] flex items-center justify-center">
                  <img src={element.Logo} alt="timelinelogo" />
                </div>
                <div>
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
              {index !== 3 && <div className="border border-dashed border-richblack-900 rotate-90 w-[32px] relative left-[7px] mt-2 mb-4 sm:top-[15px] sm:left-[8px] sm:mt-3 sm:mb-6"></div>}
            </div>
          );
        })}
      </div>

      <div className="relative shadow-blue-200">
        <img
          src={timelineImage}
          alt="timelineImage"
          className="shadow-white object-cover h-fit"
        />

        <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-3 sm:py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex gap-3 sm:gap-5 items-center border-r border-caribbeangreen-300 px-3 sm:px-8">
            <p className="text-2xl sm:text-3xl font-bold">10</p>
            <p className="text-caribbeangreen-300 text-xs sm:text-sm">Years Experiences</p>
          </div>

          <div className="flex gap-3 sm:gap-5 items-center px-3 sm:px-8">
            <p className="text-2xl sm:text-3xl font-bold">250</p>
            <p className="text-caribbeangreen-300 text-xs sm:text-sm">Types of Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
