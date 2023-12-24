"use client";

import Loading from "@/components/Loading";
import CreateQuestion from "@/components/admins/buttons/CreateQuestion";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import QuestionItem from "@/components/admins/questions/QuestionItem";
import SelectCategory from "@/components/admins/select/SelectCategory";
import { breakpointColumnsObj } from "@/constants/masonry";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { getFromLocalStorage } from "@/helpers/localStorage";
import { useGetAllQuestionsQuery } from "@/redux/api/questions/questionApi";
import { IQuestion } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Masonry from "react-masonry-css";

const Questions = () => {
  const title = "Get All Question By Category";
  const description = `You can see and modify all questions from here and also you are able
  to create new questions`;
  const router = useRouter();

  const [categoryId, setCategoryId] = useState("");
  const user = getUserFromLocalStorage() as any;

  const { data: questions, isLoading } = useGetAllQuestionsQuery(categoryId);

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else if (user.role !== "admin") {
      toast.error("You are Unauthorized");
    }

    const categoryId = getFromLocalStorage("categoryIdOfAllQuestions");

    if (categoryId) {
      setCategoryId(categoryId);
    }
  }, [categoryId, router, user]);

  if (isLoading) {
    return <Loading />;
  }

  const refetch = () => {
    const id = getFromLocalStorage("categoryIdOfAllQuestions");

    if (id) {
      setCategoryId(id);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <CategoriesBanner title={title} description={description} />

      {/* create questions button */}
      <CreateQuestion />

      {/* category section */}
      <SelectCategory
        name="Search"
        itemName="categoryIdOfAllQuestions"
        refetch={refetch}
      />

      <div className="mb-10">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {questions?.map((question: IQuestion) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Questions;
