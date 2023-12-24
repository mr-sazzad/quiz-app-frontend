"use client";

import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import Footer from "@/components/footer/Footer";
import { getFromLocalStorage } from "@/helpers/localStorage";
import {
  useGetSingleQuestionQuery,
  useUpdateSingleQuestionMutation,
} from "@/redux/api/questions/questionApi";
import { useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const EditQuestion = () => {
  const title = "Edit The Wrong Question";
  const description = "Please Follow the Instructions to Edit the Question";
  const { id } = useParams();
  const categoryId = getFromLocalStorage("categoryIdOfAllQuestions");

  const { data: question, isLoading } = useGetSingleQuestionQuery(id);
  const [updateSingleQuestion, { isLoading: isUpdating }] =
    useUpdateSingleQuestionMutation();

  const [options, setOptions] = useState(question?.options || []);
  const [newQuestion, setNewQuestion] = useState(question?.text || "");
  const [correctAnswers, setCorrectAnswers] = useState(
    question?.correctAnswers || ""
  );
  const [explanation, setExplanation] = useState(question?.explanation || "");

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  if (isLoading) {
    return <p> Loading ...</p>;
  }

  const handleQuestionUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestedData = {
      text: newQuestion || question.text,
      options: options || question.options,
      correctAnswers: correctAnswers || question.correctAnswers,
      explanation: explanation || question.explanation,
      categoryId,
    };

    const result: any = await updateSingleQuestion({ id, ...requestedData });

    if (result.success !== false) {
      toast.success("Question Updated successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mb-14 md:mb-0">
      <CategoriesBanner title={title} description={description} />

      <form
        className="flex justify-center items-center mt-10 w-full mb-14"
        onSubmit={handleQuestionUpdate}
      >
        <div className="border border-gray-400 shadow p-5 rounded md:w-[400px] w-full">
          <div className="flex flex-col gap-1">
            <p className="text-center text-xl font-semibold">Update Me</p>
            {/* question section */}
            <label className="ml-2">Question</label>
            <input
              type="text"
              defaultValue={question.text}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="px-4 py-2 rounded border outline-none border-gray-400"
            />
          </div>

          {/* options section */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="ml-2">Options</label>
            {question.options.map((option: string, index: number) => (
              <input
                key={index}
                defaultValue={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="px-4 py-2 rounded border outline-none border-gray-400"
              />
            ))}
          </div>
          {/* corrected answer section */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="ml-2">Corrected Answers</label>
            <input
              type="text"
              defaultValue={question.correctAnswers}
              onChange={(e) => setCorrectAnswers(e.target.value)}
              className="px-4 py-2 rounded border outline-none border-gray-400"
            />
          </div>

          {/* Explanation of corrected answers */}
          <div className="flex flex-col gap-1 mt-3">
            <label className="ml-2">Explanation</label>
            <input
              type="text"
              defaultValue={question.explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="px-4 py-2 rounded border outline-none border-gray-400"
            />
          </div>

          {/* updated button */}
          <button
            type="submit"
            className="w-full px-3 py-2 rounded bg-green-400 hover:bg-green-600 transition duration-300 mt-3"
          >
            {isUpdating ? "Loading ..." : "Update Question"}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default EditQuestion;
