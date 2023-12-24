"use client";

import Loading from "@/components/Loading";
import Footer from "@/components/footer/Footer";
import QuestionHeader from "@/components/questions/QuestionHeader";
import QuizSection from "@/components/questions/QuizSection";
import Category from "@/components/quiz/Category";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/localStorage";
import { useGetRandomQuestionsQuery } from "@/redux/api/questions/questionApi";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/userApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Questions = () => {
  const router = useRouter();
  const user = getUserFromLocalStorage() as any;
  const [categoryId, setCategoryId] = useState(() =>
    getFromLocalStorage("categoryId")
  );
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(false);
  const [corrected, setCorrected] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { data: questions, isLoading } = useGetRandomQuestionsQuery(categoryId);
  const { data: person, isLoading: isUserFetching } = useGetSingleUserQuery(
    user?.id
  );
  const [quizQuestions, setQuizQuestions] = useState(questions);
  const [updateSingleUser] = useUpdateSingleUserMutation();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }

    setToLocalStorage("TotalQuizzes", JSON.stringify(quizQuestions?.length));

    if (!isLoading) {
      setQuizQuestions(questions);
    }
  }, [isLoading, setQuizQuestions, questions, router, user, quizQuestions]);

  if (isLoading || isUserFetching) {
    return <Loading />;
  }

  const refetch = () => {
    setCategoryId(getFromLocalStorage("categoryId"));
  };

  if (!quizQuestions || quizQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center  w-full h-[80vh]">
        <div className="">
          <Category refetch={refetch} />
        </div>
      </div>
    );
  }

  const { text, options, correctAnswers, explanation } = quizQuestions[0];
  let quizScore = Number(getFromLocalStorage("quizScore")) || 0;

  const handleOptionSelect = (index: number) => {
    const isAlreadySelected = selectedOptions.includes(index);

    let newSelectedOptions: number[];

    if (isAlreadySelected) {
      newSelectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== index
      );
    } else {
      newSelectedOptions = [...selectedOptions, index];
    }

    setSelectedOptions(newSelectedOptions);
  };

  const checkCorrectness = () => {
    const commonElements = correctAnswers.filter((option: number) =>
      selectedOptions.includes(option)
    );

    return (
      commonElements.length === correctAnswers.length &&
      commonElements.length === selectedOptions.length
    );
  };

  const handleQuizSubmit = async () => {
    if (selectedOptions.length === 0) {
      toast.error("Please select posable options");
      return;
    }

    const isCorrect = checkCorrectness();

    if (isCorrect) {
      quizScore++;
    }

    if (quizQuestions.length === 1) {
      const userQuizScore = Number(getFromLocalStorage("quizScore"));
      const userTotalQuizzes = Number(getFromLocalStorage("TotalQuizzes"));

      console.log(quizScore, "quiz");

      const updatedScore = person.score + userQuizScore;
      const updatedQuizzes = person.totalQuestion + userTotalQuizzes;

      const requestedData = {
        id: user.id,
        score: updatedScore,
        totalQuestion: updatedQuizzes,
      };

      const result: any = await updateSingleUser(requestedData);
      if (result.success !== false) {
        toast.success("Congratulations well done!");
      }
      removeFromLocalStorage("categoryId");
      setTimeout(() => {
        router.push("/score");
      }, 1000);
    }

    setToLocalStorage("quizScore", JSON.stringify(quizScore));
    setCorrected(isCorrect);
    setSubmitButtonDisabled(true);
    setSubmitted(true);
  };

  const handleGetNextQuestion = () => {
    if (!submitted) {
      toast.error("Please submit the answer first");
      return;
    }

    const remainingQuestions = [...quizQuestions];
    remainingQuestions.shift();

    setQuizQuestions([...remainingQuestions]);

    setSelectedOptions([]);
    setSubmitted(false);
    setCorrected(false);
    setSubmitButtonDisabled(false);
  };

  return (
    <div>
      <QuestionHeader questions={questions} quizQuestions={quizQuestions} />

      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-xl font-semibold text-gray-600 flex gap-1 items-center my-5 capitalize">
              <span>Q:</span>
              {text}
            </p>
            <ul>
              <li>
                {options.map((option: string, index: number) => (
                  <p
                    key={index}
                    className={`px-3 py-2 rounded mb-1 w-[250px] border border-gray-400 hover:bg-gray-100 hover:shadow cursor-pointer ${
                      selectedOptions.includes(index)
                        ? "bg-green-300 hover:bg-green-300"
                        : ""
                    }
                ${submitButtonDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    {option}
                  </p>
                ))}
              </li>
            </ul>
            {/* button part */}
            <div className="flex justify-between w-[250px] mt-5">
              <button
                className={`px-4 py-2 bg-green-500 hover:bg-green-600 transition rounded ${
                  submitButtonDisabled ? "cursor-not-allowed opacity-50" : ""
                }
          ${quizQuestions.length === 1 ? "w-full" : ""}
          `}
                onClick={handleQuizSubmit}
              >
                Submit
              </button>
              <button
                className={`px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded ${
                  quizQuestions.length === 1 ? "hidden" : ""
                }`}
                onClick={handleGetNextQuestion}
              >
                Next
              </button>
            </div>

            {submitted && (
              <div className="mt-5">
                {corrected ? (
                  <div className="w-[200px]">
                    <p className="text-xl font-semibold">Congratulations!</p>
                    <p>Your Answer is Correct</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-red-600">Your Answer is wrong</p>
                    <p className="text-xl font-semibold">Explanation:</p>
                    <p>{explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Questions;
