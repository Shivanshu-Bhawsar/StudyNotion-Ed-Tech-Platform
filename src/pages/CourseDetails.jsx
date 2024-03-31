import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import RatingSlider from "../components/common/RatingSlider";
import Footer from "../components/common/Footer";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { addToCart } from "../services/operations/profileAPI";
import GetAvgRating from "../utils/avgRating";
import { ACCOUNT_TYPE } from "../utils/constants";
import { convertSecondsToDuration } from "../utils/secToDuration"
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";
import { FaShareSquare } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import IconBtn from "../components/common/IconBtn";

const CourseDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const [courseDetail, setCourseDetail] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handlePayment = async() => {
    setLoading(true);
    if (token) {
      await buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      navigate("/login");
    }
    setLoading(false);
  };

  const handelAddToCart = async() => {
    setLoading(true);
    if (token) {
      await addToCart(courseId, token, dispatch);
    } else {
      navigate("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCourseDetails = async () => {
      const response = await fetchCourseDetails(courseId, dispatch);
      setCourseDetail(response);
    };
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    if (courseDetail?.ratingAndReviews?.length > 0) {
      const count = GetAvgRating(courseDetail?.ratingAndReviews);
      setAvgReviewCount(count);
    }
  }, [courseDetail?.ratingAndReviews]);

  useEffect(() => {
    if (courseDetail) {
      const Enrolled = courseDetail?.studentsEnrolled?.find(
        (student) => student === user?._id
      );
      if (Enrolled) {
        setAlreadyEnrolled(true);
      }
    }
  }, [courseDetail, user?._id]);

  const courseDuration = (courseDetails) => {
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((item) => {
        const timeDurationInSeconds = parseInt(item.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    return convertSecondsToDuration(totalDurationInSeconds);
  }

  if (!courseDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:w-[1260px] lg:relative flex flex-col sm:flex-row gap-6 p-7 md:px-[75px] md:py-[32px] bg-richblack-800">
        <div className="mx-auto md:mx-0 max-w-maxContentTab xl:max-w-[810px]">
          <div className="mt-5 flex flex-col justify-center gap-3">
            <p className="text-sm text-richblack-300">
              Home / Catalog /{" "}
              <span className="text-yellow-25 font-medium">
                {courseDetail.category.name}
              </span>{" "}
            </p>
            <p className="text-3xl font-medium text-richblack-5">
              {courseDetail?.courseName}
            </p>
            <p className="text-sm text-richblack-200">
              {courseDetail?.courseDescription}
            </p>
            <div className="flex gap-x-2 items-center">
              <span className="text-lg font-semibold text-yellow-100">
                {avgReviewCount || 0}
              </span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="hidden md:block text-base text-richblack-25">
                ({courseDetail?.ratingAndReviews?.length} ratings)
              </span>
              <span className="block md:hidden text-base text-richblack-25">
                ({courseDetail?.ratingAndReviews?.length})
              </span>
              <span className="text-base text-richblack-25">
                {courseDetail?.studentsEnrolled?.length} students
              </span>
            </div>
            <div>
              <p className="text-base text-richblack-25">
                Created by<span className="font-bold">:</span>{" "}
                {courseDetail?.instructor?.firstName}{" "}
                {courseDetail?.instructor?.lastName}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-base text-richblack-25">
              <p className="flex items-center gap-2">
                <AiOutlineInfoCircle height={"18px"} width={"18px"} />
                Created at{" "}
                {new Date(
                  courseDetail?.createdAt || courseDetail?.updatedAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="flex items-center gap-2">
                <BsGlobe height={"18px"} width={"18px"} />
                English
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex min-h-[600px] max-w-[384px] lg:absolute right-[6rem] top-[55px]">
          <div className="p-3 sm:p-5 flex flex-col gap-4 rounded-md bg-richblack-700">
            <div className="max-h-[300px] md:w-[384px] md:max-w-full">
              <img
                src={courseDetail?.thumbnail}
                alt="course img"
                className="overflow-hidden rounded-lg object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-3xl font-bold text-richblack-5">
                <span>₹ {courseDetail?.price}</span>
              </div>
              <div className="flex flex-col gap-3">
                {ACCOUNT_TYPE.INSTRUCTOR !== user?.accountType && (
                  <>
                    {alreadyEnrolled ? (
                      <IconBtn
                        text="Go to Course"
                        onclick={() => navigate("/dashboard/enrolled-courses")}
                      />
                    ) : (
                      <IconBtn text="Buy Now" onclick={handlePayment} disabled={loading} />
                    )}
                    {!alreadyEnrolled &&
                      (cart?.find((item) => item._id === courseDetail._id) ? (
                        <IconBtn
                          text="Go to Cart"
                          onclick={() => navigate("/dashboard/cart")}
                          customClasses={
                            "flex items-center justify-center gap-x-2 rounded-md py-2 px-3 text-sm md:px-4 md:text-base font-semibold text-richblack-5 bg-richblack-800 cursor-pointer transition-all duration-200 hover:scale-95"
                          }
                        />
                      ) : (
                        <IconBtn
                          text="Add to Cart"
                          onclick={handelAddToCart}
                          disabled={loading}
                          customClasses={
                            "flex items-center justify-center gap-x-2 rounded-md py-2 px-3 text-sm md:px-4 md:text-base font-semibold text-richblack-5 bg-richblack-800 cursor-pointer transition-all duration-200 hover:scale-95"
                          }
                        />
                      ))}
                  </>
                )}
                <div className="text-center text-sm text-richblack-25">
                  <p>30-Day Money-Back Guarantee</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-medium text-richblack-5">
                  This course includes<span className="font-bold">:</span>
                </p>
                {courseDetail?.instructions.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center text-caribbeangreen-100"
                  >
                    <span className="text-lg">✓</span>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div>
                {/* copy url */}
                <button
                  className="mx-auto flex items-center gap-2 py-6 text-yellow-100"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("URL copied to clipboard");
                  }}
                >
                  <FaShareSquare className="text-xl" />
                  <span className="text-base font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto  w-11/12  px-4 text-start text-richblack-5">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 flex flex-col gap-3 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="flex flex-col gap-2 text-sm font-medium text-richblack-50">
              {courseDetail?.whatYouWillLearn}
            </div>
          </div>

          <div className="max-w-[830px] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-semibold">Course content</p>
              <div className="flex flex-wrap justify-between gap-3">
                <span className="text-sm text-richblack-50">
                  {courseDetail?.courseContent?.length} sections •{" "}
                  {courseDetail?.courseContent?.reduce(
                    (acc, item) => acc + item?.subSection?.length,
                    0
                  )}{" "}
                  lectures • {courseDuration(courseDetail)} total length
                </span>
                <button onClick={() => setIsOpen(!isOpen)} className="text-sm font-medium text-yellow-50">
                  <span>Collapse all sections</span>
                </button>
              </div>
            </div>
            <div className="py-4">
              {courseDetail?.courseContent?.map((item, index) => (
                <details
                  key={index}
                  open={isOpen}
                  className="border border-solid border-richblack-600 bg-richblack-700 detailanimatation"
                >
                  <summary className="flex items-start justify-between bg-opacity-20 px-7 py-5 transition-[0.3s] cursor-pointer">
                    <div className="flex items-center gap-2">
                      <FaChevronDown
                        height={"20px"}
                        width={"20px"}
                        className="arrow"
                      />
                      <span className="text-sm font-medium">
                        {item?.sectionName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-yellow-50">
                        {item?.subSection?.length} lectures
                      </span>
                    </div>
                  </summary>
                  <div>
                    {item?.subSection?.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="relative overflow-hidden flex justify-between bg-richblack-900 p-5 border border-solid border-richblack-600"
                      >
                        <div className="flex items-center gap-2">
                          <IoVideocamOutline height={"18px"} width={"18px"} />
                          <span className="text-sm font-medium">
                            {subItem?.title}
                          </span>
                        </div>
                        <div className="text-richblack-25 text-sm">
                          {convertSecondsToDuration(subItem?.timeDuration)}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="mt-5 text-2xl font-semibold">Author</p>
          <div className="flex items-center gap-3">
            <img
              src={courseDetail?.instructor.image}
              alt="author img"
              className="w-[48px] h-[48px] rounded-full object-cover"
            />
            <p className="text-base font-medium">
              {courseDetail?.instructor?.firstName}{" "}
              {courseDetail?.instructor?.lastName}
            </p>
          </div>
          <p className="text-richblack-50 text-sm">
            {courseDetail?.instructor?.additionalDetails?.about}
          </p>
        </div>
      </div>

      <div className="mx-auto my-24 w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5">
        <h1 className="mt-8 text-center text-4xl font-semibold text-richblack-5 tracking-tight">
          Reviews from other learners
        </h1>
        <div className="w-full">
          <RatingSlider />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourseDetails;
