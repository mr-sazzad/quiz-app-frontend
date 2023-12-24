"use client";

import Loading from "@/components/Loading";
import Footer from "@/components/footer/Footer";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/categories/categoryApi";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgArrowRight } from "react-icons/cg";

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState<string>("");

  const { data: category, isLoading: categoryLoading } =
    useGetSingleCategoryQuery(id);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const user = getUserFromLocalStorage() as any;

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else if (user.role !== "admin") {
      toast.error("You are Unauthorized");
    }
  }, [router, user, category?.name]);

  if (categoryLoading) {
    return <Loading />;
  }

  const handleCategoryUpdate = async (name: string) => {
    if (name === "" || name === category.name) {
      toast.error("Please Modify This Category");

      return;
    }

    const requestedData = {
      name,
    };

    const result: any = await updateCategory({ id, ...requestedData });

    if (result.success !== false) {
      toast.success("category updated successfully");
      setTimeout(() => {
        router.back();
      }, 400);
    } else {
      toast.error("category updated failed");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-[70px]">
        <div>
          <div className="flex gap-3 items-center">
            <input
              defaultValue={category?.name}
              name="name"
              className="
              md:w-[300px] 
              sm:w-[250px] 
              w-full 
              outline-none 
              px-3 py-2 
              border 
              border-gray-400 
              rounded
            "
              onBlur={(e) => setName(e.target.value)}
            />
            <button
              className="
              px-4 
              py-2 
              bg-green-400 
              hover:bg-green-500 
              transition 
              duration-200 
              rounded
            "
              onClick={() => handleCategoryUpdate(name)}
            >
              {isLoading ? "Loading..." : "Edit"}
            </button>
          </div>
          {/* back button */}
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
              group
            "
              onClick={() => router.back()}
            >
              Back To Categories Page
              <CgArrowRight
                className="
                transform 
                -rotate-[35deg] 
                bg-white 
                rounded-full 
                text-xl 
                group-hover:rotate-0 
                transition 
                duration-200
              "
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditCategory;
