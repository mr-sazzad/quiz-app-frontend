"use client";

import Loading from "@/components/Loading";
import Footer from "@/components/footer/Footer";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api/categories/categoryApi";
import { ICategory } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Categories = () => {
  const router = useRouter();
  const {
    data: categories,
    isLoading: categoryLoading,
    isError,
  } = useGetAllCategoriesQuery(undefined);
  const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category deleted successfully");
      // You might want to refetch categories here or remove the deleted category from local state
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError]);

  if (categoryLoading) {
    return <Loading />;
  }

  const handleCategoryDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully");
      // Optionally refetch or update local state to remove the deleted category
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full md:mb-0 mb-16">
      <div className="flex justify-end">
        <Link href="/admin/quiz/new-category">
          <p className="mt-[50px] px-5 py-[6px] bg-green-400 hover:bg-green-500 transition duration-200 rounded">
            Create A Category
          </p>
        </Link>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {categories && categories.length > 0 ? (
          categories.map((category: ICategory) => (
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
                disabled={isSuccess}
                className={`px-4 py-2 rounded ${
                  isSuccess ? "bg-gray-400" : "bg-red-400 hover:bg-red-500"
                } transition duration-200`}
                onClick={() => handleCategoryDelete(category.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="mt-10 h-[120px] w-full flex justify-center items-center">
            <div>
              <p className="text-sm text-gray-600 text-center">Sorry</p>
              <p className="text-xl font-medium">Category Not Found</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
