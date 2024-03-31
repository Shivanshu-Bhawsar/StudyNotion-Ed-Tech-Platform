import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";
import CatalogCard from "./CatalogCard";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          modules={[Autoplay, FreeMode]}
          className="mySwiper md:pt-5"
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1600}
          freeMode={true}
          breakpoints={{
            300: { slidesPerView: 1, spaceBetween: 10},
            768: { slidesPerView: 3, },
            1024: { slidesPerView: 3 },
          }}
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <CatalogCard
                course={course}
                Height={"h-[200px] md:h-[100px] lg:h-[201px]"}
                Width={"lg:w-[384px]"}
              />
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div>
          <div className="my-5 flex items-center justify-center text-lg text-white">
            <h1>No Course added to this Category yet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseSlider;
