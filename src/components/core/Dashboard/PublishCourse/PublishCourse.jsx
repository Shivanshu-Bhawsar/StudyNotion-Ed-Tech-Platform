import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../../../utils/constants";
import { resetCourseState, setStep } from "../../../../slices/courseSlice";
import { editCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import IconBtn from "../../../common/IconBtn";

const PublishCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const handlePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
      setLoading(false);
      return;
    }

    // if publish form is updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    );

    const result = await editCourseDetails(formData, token);
    if (result) {
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses");
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    handlePublish(data);
  };

  return (
    <div className="mt-7 rounded-lg border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 mb-7">
          <label htmlFor="public" className="flex items-center">
            <input
              defaultChecked={false}
              type="checkbox"
              id="public"
              name="public"
              {...register("public")}
              className="h-4 w-4 rounded border-pure-greys-300 bg-richblack-500 text-richblack-400"
            />
            <span className="ml-2 text-lg text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>
        <div className="ml-auto max-w-max flex items-center gap-x-4">
          <button
            disabled={loading}
            onClick={() => dispatch(setStep(2))}
            type="button"
            className="flex items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900 cursor-pointer"
          >
            Back
          </button>
          <IconBtn disabled={loading} type="submit" text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
