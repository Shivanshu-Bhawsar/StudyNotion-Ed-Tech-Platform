import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "../PublishCourse/PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="w-[calc(100vw-20%)] sm:w-fit mb-8 flex">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center justify-center gap-1">
            <div className="w-full ml-16 sm:ml-24 md:ml-36 flex">
              <div
                className={`aspect-square w-[34px] grid place-items-center rounded-full cursor-default border ${
                  step >= item.id
                    ? `${
                        step > item.id
                          ? "bg-yellow-50"
                          : "bg-yellow-900 text-yellow-50"
                      } border-yellow-50`
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }
                  `}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              {item.id < 3 && (
                <div
                  className={`h-[calc(34px/2)] w-full border-dashed border-b-2 ${
                    step > item.id ? "border-yellow-50" : "border-richblack-700"
                  }
                      }`}
                ></div>
              )}
            </div>

            <div className="md:min-w-[180px]">
              <p className="text-[10px] md:text-sm text-center text-richblack-5">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
