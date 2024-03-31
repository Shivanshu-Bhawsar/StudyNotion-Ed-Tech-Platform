import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="mt-10 z-50">
      <div className="text-3xl font-semibold text-center lg:text-4xl tracking-tight">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>

      <p className="mt-3 text-center font-medium text-richblack-300 text-base">
        Learn to build anything you can imagine
      </p>

      {/* Tabs Name */}
      <div className="w-fit mx-auto mt-7 flex items-center justify-center gap-1 rounded-full bg-richblack-800 px-2 py-1 shadow-[0px_-1px_0px_0px_#FFFFFF2E_inset]">
        {tabsName.map((element, index) => (
          <div
            className={`text-[13px] lg:text-[16px] rounded-full transition-all duration-200 cursor-pointer
                ${
                  currentTab === element
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200"
                } hover:bg-richblack-900 hover:text-richblack-5 text-center px-3 py-1 lg:px-8 lg:py-2`}
            key={index}
            onClick={() => setMyCards(element)}
          >
            {element}
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div className="mx-auto flex items-center justify-center gap-9 flex-wrap">
        {courses.map((element, index) => (
          <CourseCard
            key={index}
            cardData={element}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
