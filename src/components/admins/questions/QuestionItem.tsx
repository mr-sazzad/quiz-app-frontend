"use client";

import { IQuestion } from "@/types";
import React from "react";

import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Link from "next/link";
import { useDeleteSingleQuestionMutation } from "@/redux/api/questions/questionApi";
import toast from "react-hot-toast";

const QuestionItem = ({ question }: { question: IQuestion }) => {
  const [deleteSingleQuestion] = useDeleteSingleQuestionMutation();

  const handleDeleteQuestion = async (id: string) => {
    const result: any = await deleteSingleQuestion(id);

    if (result.success !== false) {
      toast.success("Question deleted successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      key={question.id}
      className="px-5 py-7 rounded border border-gray-400 shadow"
    >
      <div>
        <p className="text-xl font-semibold text-gray-600 capitalize">
          Q: {question.text}
        </p>
        <p className="mt-3 mb-1 ml-2 text-gray-600">Options</p>
        <ul className="flex flex-col gap-1">
          {question.options.map((option: string, index: number) => (
            <li key={index}>
              <p className="px-4 py-2 rounded border border-gray-400">
                {option}
              </p>
            </li>
          ))}
        </ul>

        {/* answers options */}
        <p className="mt-3 mb-1 ml-2 text-gray-600">Correct Answers</p>
        <ul className="flex flex-col gap-1">
          {question.correctAnswers.map((answer: number, index: number) => (
            <li key={index}>
              <p className="px-4 py-2 rounded border border-gray-400">
                {question.options[answer]}
              </p>
            </li>
          ))}
        </ul>
        {/* explanation */}
        <p className="mt-3 mb-1 ml-2 text-gray-600">Explanation</p>
        <p className="px-4 py-2 rounded border border-gray-400">
          {question.explanation}
        </p>
      </div>
      <div className="flex gap-3 items-center mt-3">
        <button
          className="px-5 py-2 rounded bg-red-400 hover:bg-red-500 group shadow shadow-red-400 flex gap-2 items-center hover:text-white transition duration-300"
          onClick={() => handleDeleteQuestion(question.id)}
        >
          Trash
          <BsTrash />
        </button>
        <Link
          href={`/admin/quiz/questions/edit/${question.id}`}
          className="px-5 py-2 rounded bg-green-400 hover:bg-green-500 group shadow shadow-green-400 flex gap-2 items-center hover:text-white transition duration-300"
        >
          Edit <BiEdit />
        </Link>
      </div>
    </div>
  );
};

export default QuestionItem;
