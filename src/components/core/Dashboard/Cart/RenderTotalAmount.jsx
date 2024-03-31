import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import IconBtn from "../../../common/IconBtn";

const RenderTotalAmount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  const handleBuyCourse = async() => {
    if (token) {
      setLoading(true);
      const courses = cart.map((course) => course._id);
      await buyCourse(token, courses, user, navigate, dispatch);
      setLoading(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-w-[270px] flex flex-col gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-3 md:p-6">
      <div className="flex flex-col gap-1 mb-3">
        <p className="text-base font-semibold text-richblack-200">Total:</p>
        <p className="text-2xl font-semibold text-yellow-50">₹ {total}</p>
      </div>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        disabled={loading}
      />
    </div>
  );
};

export default RenderTotalAmount;
