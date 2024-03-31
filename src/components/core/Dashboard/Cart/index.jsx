import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../../../../services/operations/profileAPI";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const getCourseDetails = async () => {
      await getCartData(token, dispatch);
    };
    getCourseDetails();
  }, []);

  return (
    <div className="mx-auto w-11/12 max-w-[1000px]">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-700 pb-2 text-base font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>

      {totalItems > 0 ? (
        <div className="mt-5 flex flex-col-reverse items-start gap-x-10 gap-y-8 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-12 text-xl text-center text-richblack-5">Your Cart is Empty</p>
      )}
    </div>
  );
}
