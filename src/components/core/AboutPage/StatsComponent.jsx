import React from "react";

const Stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent">
      <div className="grid grid-cols-2 md:grid-cols-4 text-center">
        {Stats.map((data, index) => {
          return (
            <div key={index} className="flex flex-col py-12">
              <h1 className="text-[30px] font-bold text-richblack-5">
                {data.count}
              </h1>
              <h2 className="text-base font-semibold text-richblack-500">
                {data.label}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsComponent;
