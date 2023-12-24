"use client";

import Loading from "@/components/Loading";
import { setToLocalStorage } from "@/helpers/localStorage";
import { useGetAllCategoriesQuery } from "@/redux/api/categories/categoryApi";
import { ICategory, IOption } from "@/types";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import Select from "react-select";

const SelectCategory = ({
  itemName,
  name,
  refetch,
}: {
  itemName: string;
  name: string;
  refetch?: () => void;
}) => {
  const { data: categories, isLoading } = useGetAllCategoriesQuery(undefined);
  const [id, setId] = useState<string>("");

  if (isLoading) {
    return <Loading />;
  }

  const options = categories.map((category: ICategory) => {
    return { value: category.id, label: category.name };
  });

  const handleGetCategoryId = (selectedOption: IOption) => {
    setId(selectedOption.value);
  };

  const handlePassCategoryId = () => {
    setToLocalStorage(itemName, id);
    if (refetch) {
      refetch();
    }
  };

  return (
    <div className="flex gap-5 items-center justify-between px-[30px] md:px-[50px]">
      <div className="w-full mt-[7px]">
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={handleGetCategoryId}
        />
      </div>
      <div>
        <button
          className="bg-green-400 hover:bg-green-500 transition duration-200 px-4 py-2 border-gray-200 mt-2 rounded"
          onClick={handlePassCategoryId}
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default SelectCategory;
