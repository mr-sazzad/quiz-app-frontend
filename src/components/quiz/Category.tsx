"use client";

import { setToLocalStorage } from "@/helpers/localStorage";
import { useGetAllCategoriesQuery } from "@/redux/api/categories/categoryApi";
import { ICategory, IOption } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import Select from "react-select";

const Category = ({ refetch }: { refetch?: () => void }) => {
  const router = useRouter();
  const { data: categories, isLoading } = useGetAllCategoriesQuery(undefined);

  if (isLoading) {
    return <p>Please Wait...</p>;
  }

  const options = categories.map((category: ICategory) => {
    return { value: category.id, label: category.name };
  });

  const handleGetCategoryId = (selectedOption: IOption) => {
    setToLocalStorage("categoryId", selectedOption.value);
  };

  const handleGetQuestions = () => {
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="md:w-[350px] sm:w-[300px] w-full border border-gray-400 p-5 rounded shadow">
      <p className="py-2 text-2xl text-center">Select A Category</p>
      <Select
        options={options}
        defaultValue={options[0]}
        onChange={handleGetCategoryId}
      />
      <button
        className="bg-green-400 hover:bg-green-500 transition duration-200 px-4 py-2 border-gray-200 w-full mt-4 rounded"
        onClick={handleGetQuestions}
      >
        Get Questions
      </button>
    </div>
  );
};

export default Category;
