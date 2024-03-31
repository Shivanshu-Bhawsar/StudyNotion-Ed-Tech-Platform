import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";
import { setProgress } from "../../slices/loadingBarSlice";

export const getCatalogPageData = async (categoryId, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setProgress(50));
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    );
    // console.log("CATALOG PAGE DATA API RESPONSE....", response);

    if (!response.data.success)
      throw new Error("Could not Fetch Category page data error", response);

    result = response?.data?.data;
  } catch (error) {
    // console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error("No Course added to this category yet");
    result = error.response?.data;
  }
  dispatch(setProgress(100));
  toast.dismiss(toastId);
  return result;
};
