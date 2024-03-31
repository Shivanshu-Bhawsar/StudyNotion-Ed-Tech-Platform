import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div>
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-[1000] fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="rounded-md px-3 py-2 text-sm md:text-lg md:px-5 font-medium text-richblack-900 bg-richblack-200 cursor-pointer"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>

      <div className="fixed inset-0 z-50 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm"></div>
    </div>
  );
};

export default ConfirmationModal;
