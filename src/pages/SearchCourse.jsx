import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchCourses } from "../services/operations/courseDetailsAPI";
import CatalogCard from "../components/core/Catalog/CatalogCard";
import { HiOutlineEmojiSad } from "react-icons/hi";

const SearchCourse = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      const res = await searchCourses(searchQuery, dispatch);
      setSearchResults(res);
      setLoading(false);
    };
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <div className="mx-auto flex flex-col justify-center gap-4 bg-richblack-800 px-[50px] py-10 sm:px-[115px] sm:py-14">
        <p className="text-sm text-richblack-300">
          Home / Search / <span className="text-yellow-25">{searchQuery}</span>{" "}
        </p>
        <p className="text-3xl text-richblack-5">
          Search Results for {searchQuery}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {searchResults?.length} results found for {searchQuery}
        </p>
      </div>
      {loading ? (
        <div className="h-[calc(100vh)] w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-richblack-500"></div>
        </div>
      ) : searchResults?.length === 0 ? (
        <div className="mx-auto min-h-[500px] flex flex-col items-center justify-center gap-4 p-5 bg-richblack-900">
          <p className="text-3xl text-richblack-5">No Results Found</p>
          <HiOutlineEmojiSad className="text-richblack-100 text-[100px]" />
        </div>
      ) : (
        <div className="mx-auto flex flex-wrap p-5 gap-4 justify-evenly m-5">
          {searchResults?.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              <CatalogCard
                course={item}
                Height={"h-[200px] lg:h-[290px]"}
                Width={"lg:w-[550px]"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCourse;
