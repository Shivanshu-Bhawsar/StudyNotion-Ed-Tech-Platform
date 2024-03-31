import React from "react";
import { FiEdit } from "react-icons/fi";

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
  editbtn,
}) => {
  return (
    <button
      className={`${customClasses ? customClasses : "flex items-center justify-center gap-x-2 rounded-md py-2 px-3 text-sm md:px-4 md:text-base font-semibold text-richblack-900 bg-yellow-50 cursor-pointer transition-all duration-200 hover:scale-95"} `}
      disabled={disabled}
      onClick={onclick}
      type={type}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
      { editbtn && <FiEdit /> }
    </button>
  );
};

export default IconBtn;
