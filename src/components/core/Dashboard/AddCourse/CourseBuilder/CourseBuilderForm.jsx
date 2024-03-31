import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NestedView from "./NestedView";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";
import IconBtn from "../../../../common/IconBtn";
import { MdKeyboardArrowRight } from "react-icons/md";

const CourseBuilderForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section to continue");
      return;
    }

    if (course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionId: editSectionName,
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionId: editSectionName,
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const handelChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      setEditSectionName(null);
      setValue("sectionName", "");
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="space-y-5 rounded-md border border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="sectionName">
          Section Name<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="sectionName"
          name="sectionName"
          placeholder="Add a section to build your course"
          {...register("sectionName", { required: true })}
          className="form-style w-full !bg-richblack-700"
        />
        {errors.sectionName && (
          <p className="ml-2 text-xs tracking-wide text-pink-200">
            Section Name is required**
          </p>
        )}
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            disabled={loading}
            customClasses="mt-4 flex items-center gap-x-2 border border-yellow-50 bg-transparent cursor-pointer rounded-md py-2 px-5 font-semibold text-yellow-50"
          >
            <AiOutlinePlusCircle size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              onClick={() => {
                setEditSectionName(null);
                setValue("sectionName", "");
              }}
              type="button"
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course.courseContent.length > 0 && (
        <NestedView handelChangeEditSectionName={handelChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={() => {
            dispatch(setStep(1));
            dispatch(setEditCourse(true));
          }}
          className="flex items-center gap-x-2 cursor-pointer rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900"
        >
          Back
        </button>
        <IconBtn text="Next" onclick={goNext} disabled={loading}>
          <MdKeyboardArrowRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
