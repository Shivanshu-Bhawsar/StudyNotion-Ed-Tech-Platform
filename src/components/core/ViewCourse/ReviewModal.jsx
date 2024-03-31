import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import { RxCross2 } from "react-icons/rx";

const ReviewModal = ({ setReviewModal }) => {
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("userExperience", "");
    setValue("userRating", undefined);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("userRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseId,
        review: data.userExperience,
        rating: data.userRating,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div>
      <div className="z-[1000] my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button>
            <RxCross2
              onClick={() => setReviewModal(false)}
              className="text-xl text-richblack-25"
            />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt="userImg"
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              onChange={ratingChanged}
            />

            {/* for rating requirement */}
            <input
              type="hidden"
              value={getValues().userRating}
              {...register("userRating", { required: true })}
            />
            {errors.userRating && (
              <span className="text-pink-200 text-[11px]">
                Please provide your rating**
              </span>
            )}

            <div className="flex w-11/12 flex-col space-y-2">
              <label
                htmlFor="userExperience"
                className="text-sm text-richblack-5"
              >
                Add Your Experience<span className="text-pink-200">*</span>{" "}
              </label>
              <textarea
                id="userExperience"
                placeholder="Write your experience..."
                {...register("userExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full !bg-richblack-700"
              ></textarea>
              {errors.userExperience && (
                <span className="text-pink-200 text-[12px]">
                  Please provide your expirence**
                </span>
              )}
            </div>

            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className="px-3 py-2 rounded-md text-sm md:px-4 md:text-base font-semibold bg-richblack-300 transition-all duration-200 hover:scale-95"
              >
                Cancel
              </button>
              <IconBtn type="submit" text="Save"/>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed inset-0 z-50 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"></div>
    </div>
  );
};

export default ReviewModal;
