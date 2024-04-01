import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ratingsEndpoints } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import RatingStars from "./RatingStars";
import { Autoplay, FreeMode, Keyboard, Mousewheel, Navigation } from "swiper/modules";

const RatingSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
        if(res?.data?.success) {
          setReviews(res.data.data);
        }
      } catch (error) {
        console.log("LOGGING REVIEW ERROR: ", error);
      }
      setLoading(false);
    };
    getReviews();
  }, []);

  return (
    <div className="mt-5">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        modules={[Navigation, Autoplay, FreeMode]}
        className="mySwiper md:pt-5"
        loop={true}
        autoplay={{
           delay: 2000,
           disableOnInteraction: false,
        }}
        speed={1600}
        freeMode={true}
        breakpoints={{
          300: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews?.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-3 min-h-[150px] bg-richblack-800 p-3 text-[14px] text-richblack-25">
              <div className="flex items-center gap-4">
                <img
                  src={review?.user?.image}
                  alt="user"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-richblack-5">
                    {review?.user?.firstName} {review?.user.lastName}
                  </h3>
                  <p className="text-[12px] font-medium text-richblack-500">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>
              <div className="font-medium text-richblack-25">
                {review?.review.slice(0, 70)}...
              </div>
              <RatingStars Review_Count={review?.rating} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RatingSlider;
