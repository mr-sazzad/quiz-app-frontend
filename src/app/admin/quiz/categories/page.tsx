"use client";

import Loading from "@/components/Loading";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api/categories/categoryApi";
import { ICategory } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const Categories = () => {
  const router = useRouter();
  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery(undefined);
  const [deleteCategory, { isSuccess, isLoading, isError }] =
    useDeleteCategoryMutation();

  if (isLoading || categoryLoading) {
    return <Loading />;
  }

  const handleCategoryDelete = async (id: string) => {
    await deleteCategory(id);
  };

  if (isSuccess) {
    toast.success("Category deleted successfully");
  }
  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex justify-end">
        <Link
          href="/admin/quiz/new-category"
          className="mt-[50px] px-5 py-[6px] bg-green-400 hover:bg-green-500 transition duration-200 rounded"
        >
          Create A Category
        </Link>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {categories.map((category: ICategory) => (
          <div key={category.id} className="flex gap-3 items-center">
            <p className="px-3 py-2 rounded border border-gray-300 w-full text-gray-900">
              {category.name}
            </p>

            <button
              className="px-4 py-2 rounded bg-green-400 hover:bg-green-500 transition duration-200"
              onClick={() =>
                router.push(`/admin/quiz/categories/edit/${category.id}`)
              }
            >
              Edit
            </button>
            <button
              className="px-4 py-2 rounded bg-red-400 hover:bg-red-500 transition duration-200"
              onClick={() => handleCategoryDelete(category.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
