"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CgArrowRight } from "react-icons/cg";
import { useCreateCategoryMutation } from "@/redux/api/categories/categoryApi";
import { getUserFromLocalStorage } from "@/helpers/jwt";

const NewCategory = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const user = getUserFromLocalStorage() as any;

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else if (user.role !== "admin") {
      toast.error("You are Unauthorized");
    }
  }, [router, user]);

  const handleCategoryCreation = async () => {
    if (value.trim() === "") {
      toast.error("Please insert a category name.");
      return;
    }

    try {
      const requestedData = {
        name: value,
      };

      const result: any = await createCategory(requestedData);

      if (result?.success) {
        toast.success("Category created successfully");
        router.push("/admin/quiz/categories");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center mt-[70px]">
      <div>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="
              md:w-[300px]
              sm:w-[250px]
              w-full 
              outline-none 
              px-3 py-2 
              border 
              border-gray-400 
              rounded"
          />
          <button
            disabled={isLoading}
            className={`
              px-4 
              py-2 
              bg-green-400 
              hover:bg-green-500 
              transition 
              duration-200 
              rounded
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={handleCategoryCreation}
          >
            {isLoading ? "Loading..." : "Create"}
          </button>
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <button
            className="
              mt-7 
              bg-indigo-400 
              hover:bg-indigo-500 
              px-4 
              py-2 
              rounded 
              flex 
              items-center 
              gap-2 
              group"
            onClick={() => router.back()}
          >
            Back To Categories Page
            <CgArrowRight
              className="
               transform group-hover:rotate-[35deg] rotate-[0deg]  
               bg-white rounded-full text-xl transition duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCategory;
