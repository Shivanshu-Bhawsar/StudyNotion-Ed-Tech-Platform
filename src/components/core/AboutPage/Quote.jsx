import React from "react";

const Quote = () => {
  return (
    <div className="mx-auto text-xl md:text-4xl font-semibold py-5 pb-20 text-center text-richblack-100 tracking-tight">
      <span className="text-richblack-300 relative -top-3 -left-2">"</span>
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-semibold">
        {" "}
        combines technology,
      </span>
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-semibold">
        {" "}
        expertise
      </span>
      , and community to create an
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-semibold">
        {" "}
        unparalleled educational experience.
      </span>
      <span className="text-richblack-300 relative -top-1">"</span>
    </div>
  );
};

export default Quote;
