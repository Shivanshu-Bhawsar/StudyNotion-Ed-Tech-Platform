import { HiUsers } from "react-icons/hi2";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div className="relative top-20">
      <div
        className={`flex flex-col w-[360px] px-6 pt-6 pb-1 cursor-pointer ${
          currentCard === cardData.heading
            ? "bg-white text-richblack-500 shadow-[12px_12px_0px_#FFD60A]"
            : "bg-richblack-800 text-richblack-400"
        }`}
        onClick={() => {
          setCurrentCard(cardData.heading);
        }}
      >
        {/* Card Section - 1 */}
        <div className="mb-16 flex flex-col gap-3 text-center p-2">
          <p className={`text-xl font-semibold text-left ${currentCard === cardData.heading ? "text-richblack-800" : "text-richblack-25"}`}>
            {cardData.heading}
          </p>
          <p className="text-left text-base">{cardData.description}</p>
        </div>

        {/* Card Section - 2 */}
        <div className={`flex justify-between w-full p-3 border-t-2 border-dashed
            ${ currentCard === cardData.heading ? "text-blue-500" : "text-richblack-300"}
            ${ currentCard === cardData.heading ? "border-richblack-50" : "border-richblack-600"}`}
        >

          <div className="text-[16px] font-medium flex items-center justify-center gap-2">
            <HiUsers className={`${ currentCard === cardData.heading ? "text-blue-300" : "text-richblack-400"}`} />
            <p>{cardData.level}</p>
          </div>

          <div className="text-[16px] font-medium flex items-center justify-center gap-2">
            <HiUsers className={`${ currentCard === cardData.heading ? "text-blue-300" : "text-richblack-400"}`} />
            <p>{cardData.lessionNumber} Lessons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
