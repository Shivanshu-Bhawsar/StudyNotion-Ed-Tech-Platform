import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "../HomePage/Button";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,
  codeColor,
}) => {
  return (
    <div
      className={`w-full flex ${position} gap-20 mt-16 lg:my-20 flex-wrap`}
    >
      {/*Section 1*/}
      <div className="flex flex-col gap-8 lg:w-[47%] p-4">
        {heading}
        <div className="text-richblack-300 font-bold text-md p-4 md:text-lg -mx-4 -my-7">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7 p-3 -mx-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/*Section 2*/}
      <div className="flex mt-5 text-[10px] w-full md:w-[700px] lg:w-[500px] py-3 glass">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold text-[16px]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div
          className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} pr-2`}
        >
          <div className={`${backgroudGradient}`}></div>
          <TypeAnimation
            sequence={[codeblock, 5000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              overflowX: "hidden",
              fontSize: "16px",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
