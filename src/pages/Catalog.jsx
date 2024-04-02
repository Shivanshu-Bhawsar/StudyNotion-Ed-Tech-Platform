import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import CatalogCard from "../components/core/Catalog/CatalogCard";
import Footer from "../components/common/Footer";

const Catalog = () => {
  const dispatch = useDispatch();
  const { catalogName } = useParams();
  const [desc, setDesc] = useState([]);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [activeOption, setActiveOption] = useState(1);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = result.data.data.filter(
          (item) => item.name.split(" ").join("-").toLowerCase() === catalogName
        )[0]._id;
        setCategoryID(category_id);
        setDesc(
          result.data.data.filter(
            (item) =>
              item.name.split(" ").join("-").toLowerCase() === catalogName
          )[0].description
        );
      } catch (error) {
        console.log("Could not fetch category details: ", error);
      }
    };
    getCategoryDetails();
  }, [catalogName]);

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogPageData(categoryID, dispatch);
      setCatalogPageData(result);
    };
    if (categoryID) {
      fetchCatalogPageData();
    }
  }, [categoryID]);

  return (
    <div>
      <div className="mx-auto flex flex-col justify-center gap-4 box-content bg-richblack-800 px-[50px] py-10 sm:px-[115px] sm:py-14">
        <p className="text-sm text-richblack-300">
          Home / Catalog /{" "}
          <span className="text-yellow-25 font-medium capitalize">
            {catalogName.split("-").join(" ")}
          </span>{" "}
        </p>
        <p className="text-3xl text-richblack-5 font-medium capitalize">
          {catalogName.split("-").join(" ")}
        </p>
        <p className="max-w-[870px] text-sm text-richblack-200">{desc}</p>
      </div>

      <div className="mx-auto w-10/12 max-w-maxContent">
        <div className="mx-auto w-full max-w-maxContentTab box-content px-2 py-12 lg:max-w-maxContent">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-richblack-5">
            Courses to get you started
          </h2>
          <div className="mt-4 mb-7 flex border-b border-b-richblack-600 text-md font-medium">
            <button
              onClick={() => {
                setActiveOption(1);
              }}
              className={
                activeOption === 1
                  ? `px-4 py-2 border-b border-b-yellow-100 text-yellow-100 cursor-pointer`
                  : `px-4 py-2 text-richblack-200 cursor-pointer`
              }
            >
              Most Populer
            </button>
            <button
              onClick={() => {
                setActiveOption(2);
              }}
              className={
                activeOption === 1
                  ? "px-4 py-2 text-richblack-50 cursor-pointer"
                  : "px-4 py-2 border-b border-b-yellow-25 text-yellow-25 cursor-pointer"
              }
            >
              New
            </button>
          </div>
          <CourseSlider Courses={catalogPageData?.selectedCourses} />
        </div>

        <div className="mx-auto w-full max-w-maxContentTab box-content px-4 py-12 lg:max-w-maxContent">
          <h2 className="mb-9 text-xl sm:text-2xl md:text-3xl font-semibold text-richblack-5">
            Top Courses in other Categories
          </h2>
          <CourseSlider Courses={catalogPageData?.differentCourses} />
        </div>

        <div className="mx-auto w-full max-w-maxContentTab box-content px-2 py-12 lg:max-w-maxContent">
          <h2 className="mb-9 text-xl sm:text-2xl md:text-3xl font-semibold text-richblack-5">
            Frequently Bought Together
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 pr-4">
            {catalogPageData?.mostSellingCourses?.map((item, index) => (
              <CatalogCard
                key={index}
                course={item}
                Height={"h-[200px] lg:h-[290px]"}
                Width={"lg:w-[550px]"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalog;
