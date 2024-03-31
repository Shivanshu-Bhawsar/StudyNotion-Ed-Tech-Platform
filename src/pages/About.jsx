import React from "react";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import RatingSlider from "../components/common/RatingSlider";
import Footer from "../components/common/Footer";

const About = () => {
  return (
    <div>
      {/* section 1 */}
      <section className="bg-richblack-800">
        <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col justify-between gap-10 text-center">
          <header className="mx-auto lg:w-[70%] py-16 px-5 text-4xl font-semibold text-richblack-5">
            <p className="tracking-tight">
              Driving Innovation in Online Education for a
              <HighlightText text={"Brighter Future"} />
            </p>
            <p className="mx-auto lg:w-[95%] mt-3 text-base font-medium text-richblack-300">
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="w-[100%] absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="image1" />
            <img src={BannerImage2} alt="image2" />
            <img src={BannerImage3} alt="image3" />
          </div>
        </div>
      </section>

      {/* section 2 */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col justify-between md:gap-10 text-richblack-500">
          <div className="h-[70px] md:h-[120px]"></div>
          <Quote />
        </div>
      </section>

      {/* section 3 */}
      <section>
        <div className="mx-auto w-10/12 max-w-maxContent flex flex-col justify-between text-richblack-500">
          {/* foudning story wala div */}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10">
            {/* founding story left box */}
            <div className="lg:w-[50%] my-24 flex flex-col gap-6">
              <h1 className="lg:w-[70%] bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text text-4xl font-semibold tracking-tight">
                Our Founding Story
              </h1>

              <p className="lg:w-[90%] text-base font-medium text-richblack-300">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p className="lg:w-[90%] text-base font-medium text-richblack-300">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* founding story right box */}
            <div className="lg:p-8">
              <img
                className="shadow-[0_0_20px_0_#FC6767]"
                src={FoundingStory}
                alt="storyImage"
              />
            </div>
          </div>

          {/* vision and mission wala parent div */}
          <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10">
            {/* left box */}
            <div className="lg:w-[50%] my-[120px] lg:my-24 flex flex-col gap-6">
              <h1 className="lg:w-[70%] bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text text-4xl font-semibold tracking-tight">
                Our Vision
              </h1>
              <p className="lg:w-[90%] text-base font-medium text-richblack-300">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* right box */}
            <div className="lg:w-[50%] mb-24 lg:my-0 flex flex-col gap-6">
              <h1 className="lg:w-[70%] bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold tracking-tight">
                Our Mission
              </h1>
              <p className="lg:w-[88%] text-base font-medium text-richblack-300">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className="bg-richblack-800">
        <StatsComponent />
      </section>

      {/* section 5 */}
      <section className="mt-24 flex flex-col items-center justify-between gap-5">
        <LearningGrid />
        <ContactFormSection />
      </section>

      {/* Rating */}
      <section>
        <div className="mx-auto my-28 w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 bg-richblack-900 text-white">
          <h1 className="mt-8 text-center text-4xl font-semibold text-richblack-5 tracking-tight">
            Reviews from other learners
          </h1>
          <div className="w-full">
            <RatingSlider />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
