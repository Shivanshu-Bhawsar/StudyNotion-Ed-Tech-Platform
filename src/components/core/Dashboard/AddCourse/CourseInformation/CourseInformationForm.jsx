import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RequirementField from "./RequirementField";
import Upload from "./Upload";
import ChipInput from "./ChipInput";
import { setStep, setCourse, setEditCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from ".././../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    )
      return true;
    else return false;
  };

  const onSubmit = async (data) => {
    // edit an existing course
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (currentValues.courseImage !== course.thumbnailImage) {
          formData.append("thumbnailImage", data.courseImage);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        if (
          currentValues.courseTags.toString() !==
          course.tag.toString()
        ) {
          formData.append(
            "tag",
            JSON.stringify(data.courseTags)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setEditCourse(false));
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made so far");
      }
      return;
    }

    //create a new course
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6 rounded-md border border-richblack-700 bg-richblack-800">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseTitle">
            Course Title<sup className="text-pink-200">*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            disabled={loading}
            {...register("courseTitle", { required: true })}
            className="form-style w-full !bg-richblack-700"
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Title is Required**
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
            Course Short Description<sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            disabled={loading}
            {...register("courseShortDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] !bg-richblack-700 w-full"
          />
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required**
            </span>
          )}
        </div>

        <div className="relative flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="coursePrice">
            Price<sup className="text-pink-200">*</sup>
          </label>
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            disabled={loading}
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="form-style w-full !bg-richblack-700 !pl-14"
          />
          <HiOutlineCurrencyRupee
            size={30}
            className="absolute top-7 left-3 text-richblack-400"
          />
          {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is Required**
            </span>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseCategory">
            Category<sup className="text-pink-200">*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            disabled={loading}
            {...register("courseCategory", { required: true })}
            className="form-style w-full !bg-richblack-700"
          >
            <option value="" disabled>
              Choose a Category
            </option>

            {!loading &&
              courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is Required**
            </span>
          )}
        </div>

        {/* custom component for handling tags input */}
        <ChipInput
          label="Tags"
          name="courseTags"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          disabled={loading}
        />

        {/*component for uploading and showing preview of media */}
        <Upload
          label={"Course Thumbnail"}
          name={"courseImage"}
          register={register}
          errors={errors}
          setValue={setValue}
          disabled={loading}
        />

        {/* Benefits of the Course */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benefits of the course<sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseBenefits"
            placeholder="Enter Benefits of the Course"
            disabled={loading}
            {...register("courseBenefits", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full !bg-richblack-700"
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course are required**
            </span>
          )}
        </div>

        <RequirementField
          label="Requirements/Instructions"
          name="courseRequirements"
          register={register}
          errors={errors}
          setValue={setValue}
          disabled={loading}
        />

        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="p-2 text-sm md:px-4 md:text-base font-semibold rounded-md flex items-center gap-x-2 bg-richblack-300"
            >
              Continue Without Saving
            </button>
          )}

          <IconBtn type="submit" text={!editCourse ? "Next" : "Save Changes"}>
            <MdKeyboardArrowRight />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
