import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createCategory } from "../../../../services/operations/courseDetailsAPI";
import IconBtn from "../../../common/IconBtn";

const AddCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.name || !category.description) {
      return;
    }
    await createCategory(
      {
        name: category.name,
        description: category.description,
      },
      token
    );
    setCategory({name: "", description: ""});
  };

  return (
    <div className="mx-auto w-10/12 max-w-[1000px] my-8 flex flex-col gap-7">
      <h1 className="text-3xl text-richblack-5">Add Category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 p-6 rounded-md border border-richblack-700 bg-richblack-800">
        <div className="flex flex-col gap-2">
          <label className="text-lg text-richblack-25" htmlFor="category">Category Name</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category.name}
            required={true}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            placeholder="Enter Category Name"
            className="form-style !bg-richblack-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg text-richblack-25" htmlFor="category">Category Description</label>
          <textarea
            type="text"
            name="category"
            id="category"
            value={category.description}
            required={true}
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
            placeholder="Enter Category Description"
            className="form-style !bg-richblack-700"
          />
        </div>
        <div><IconBtn type="submit" text="Create Category" /></div>
      </form>
    </div>
  );
};

export default AddCategory;
