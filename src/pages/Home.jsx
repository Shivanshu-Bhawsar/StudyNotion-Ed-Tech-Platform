import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { setProgress } from "../slices/loadingBarSlice";
import CTAButton from "../components/core/HomePage/Button";
import HighlightText from "../components/core/HomePage/HighlightText";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import RatingSlider from "../components/common/RatingSlider";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      {/* Section 1 */}
      <div className="relative w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between text-white">
        <Link
          onClick={() => {
            dispatch(setProgress(100));
          }}
          to={"/signup"}
        >
          <div className="group w-fit mt-16 mx-auto rounded-full text-richblack-100 bg-richblack-800 font-bold transition-all duration-200 hover:scale-95">
            <div className="flex items-center gap-2 px-7 py-2 rounded-full transition-all duration-200 group-hover:bg-richblack-900 hover:border shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl lg:text-4xl font-semibold mt-7 text-richblack-5">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 w-[100%] md:w-[95%] lg:w-[90%] relative">
          <div className="videograd"></div>
          <video className="video" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section-1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="font-semibold text-4xl lg:text-4xl sm:w-full">
                Unlock Your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-brown-100"}
            backgroudGradient={"grad"}
          />
        </div>

        {/* Code Section-2 */}
        <div className="mb-16">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl lg:text-4xl font-semibold sm:w-full">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-yellow-25"}
            backgroudGradient={"grad2"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="mx-auto">
          <div className="homepage_bg h-[320px]">
            <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
              <div className="flex mt-40 gap-7 text-white">
                <CTAButton active={true} linkto={"/signup"}>
                  <div className="flex items-center gap-3">
                    Explore Full Catalog
                    <FaArrowRight />
                  </div>
                </CTAButton>
                <CTAButton active={false} linkto={"/signup"}>
                  <div>Learn More</div>
                </CTAButton>
              </div>
            </div>
          </div>

          <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7">
            <div className="flex gap-10 mb-10 mt-[95px]">
              <div className="text-richblack-900 tracking-tight text-4xl font-semibold w-[50%]">
                Get the skills you need for a
                <HighlightText text={"job that is in demand."} />
              </div>

              <div className="flex flex-col gap-8 w-[50%] items-start">
                <div className="text-[16px] ">
                  The modern StudyNotion is the dictates its own terms. Today,
                  to be a competitive specialist requires more than professional
                  skills.
                </div>
                <CTAButton active={true} linkto={"/signup"}>
                  <div>Learn More</div>
                </CTAButton>
              </div>
            </div>

            <TimelineSection />

            <LearningLanguageSection />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <InstructorSection />

        <div className="mx-auto my-28 w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 bg-richblack-900">
          <h1 className="mt-8 text-center text-4xl font-semibold text-richblack-5 tracking-tight">
            Reviews from other learners
          </h1>
          <div className="w-full">
            <RatingSlider />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
