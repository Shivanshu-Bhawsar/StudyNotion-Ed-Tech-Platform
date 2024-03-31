import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({ name, label, register, errors, setValue, disabled,  video=false, viewData=null, editData=null }) => {
  const { editCourse, course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  
  useEffect(() => {
    register(name, {
      required: true,
      // validate: (value) => value.length > 0
    });
    if (editCourse && !video) {
      setSelectedFile(course.thumbnail);
    }
  }, []);

  const handelonchange = (e) => {
    const file = e.target.files[0];
    setValue(name, file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
    } else {
      console.log("No File Found");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={label}>
        <div>
          {label} {!viewData && <sup className="text-pink-200">*</sup>}
        </div>
        {selectedFile ? (
          <div className="mt-2 flex flex-col space-y-2 px-6 py-5 rounded-md border-2 border-dotted border-richblack-500 bg-richblack-700">
            {!video ? 
              <img
                src={selectedFile}
                alt="previewImg"
                className="h-[250px] w-full rounded-md object-cover"
              />:
              <Player aspectRatio="16:9" playsInline src={selectedFile} />
            }
            {!viewData && (
              <button
                type="button"
                disabled={disabled}
                onClick={() => {
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="text-base text-richblack-5"
              >
                Remove
              </button>
            )}
          </div>
        ) : (
          <div className="mt-2 min-h-[250px] flex items-center justify-center rounded-md border-2 border-dotted border-richblack-500 bg-richblack-700 cursor-pointer">
            <div
              className="w-full flex flex-col items-center p-6"
              role="presentation"
              tabIndex={0}
            >
              <input
                id={label}
                name={name}
                type="file"
                accept={video ? "video/*,.mp4" : "image/*,.jpeg,.jpg,.png"}
                tabIndex="-1"
                // multiple=""
                {...register(name, { required: true })}
                onChange={handelonchange}
                className="hidden"
              />
              <div className="aspect-square w-14 grid place-items-center rounded-full bg-pure-greys-800">
                <FiUploadCloud className="text-2xl text-yellow-50" />
              </div>
              <p className="mt-2 max-w-[250px] text-center text-sm text-richblack-200">
                Drag and drop an {video ? "video" : "image"}, or click to{" "}
                <span className="font-semibold text-yellow-25">Browse</span> a 
                file
              </p>
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            </div>
          </div>
        )}
      </label>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required**
        </span>
      )}
    </div>
  );
};

export default Upload;
