import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

const ChipInput = ({ name, label, register, errors, setValue, disabled }) => {
  const [tags, setTags] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
    if (editCourse) {
      setTags(course?.tag);
      // setValue(name, course?.tag);
    }
  }, []);

  return (
    <div>
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}<sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-wrap gap-2 m-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            <span className="text-richblack-5">{tag}</span>
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                const updatedTags = [...tags];
                updatedTags.splice(index, 1);
                setTags(updatedTags);
                setValue(name, updatedTags);
              }}
              className="ml-2 text-richblack-5"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        id={name}
        placeholder="Press Enter or , to add a tag"
        disabled={disabled}
        className="form-style w-full !bg-richblack-700"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (e.target.value) {
              setTags([...tags, e.target.value]);
              setValue(name, [...tags, e.target.value]);
              e.target.value = "";
            }
          }
        }}
      />
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          Tags are required**
        </span>
      )}
    </div>
  );
};

export default ChipInput;
