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
import { IQuestion } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Questions = () => {
  const router = useRouter();
  const user = getUserFromLocalStorage() as any;
  const [categoryId, setCategoryId] = useState(() =>
    getFromLocalStorage("categoryId")
  );
  let quizScore = Number(getFromLocalStorage("quizScore"));
  let TotalQuizzes = Number(getFromLocalStorage("TotalQuizzes"));

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

    if (!isLoading && questions) {
      setQuizQuestions(questions);
      setToLocalStorage("TotalQuizzes", JSON.stringify(questions.length));
    }
  }, [questions]);

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
    setToLocalStorage("TotalQuizzes", JSON.stringify(TotalQuizzes));
    setCorrected(isCorrect);
    setSubmitButtonDisabled(true);
    setSubmitted(true);
  };

  const handleGetNextQuestion = () => {
    if (!submitted) {
      toast.error("Please submit the answer first");
      return;
    }
    setQuizQuestions((prevQuestions: IQuestion[]) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.shift();
      return updatedQuestions;
    });
    setSelectedOptions([]);
    setSubmitted(false);
    setCorrected(false);
    setSubmitButtonDisabled(false);
  };

  return (
    <div>
      <QuestionHeader questions={questions} quizQuestions={quizQuestions} />

      <div className="max-w-[1100px] mx-auto">
        {questions.length === 0 ? (
          <div className="flex justify-center mt-10">
            <div>
              <p className="text-sm text-gray-600">Sorry</p>
              <p>No Question available in this category</p>
              <p>Please set another Category</p>
            </div>
          </div>
        ) : (
          <QuizSection
            quizQuestions={quizQuestions}
            text={text}
            options={options}
            selectedOptions={selectedOptions}
            submitButtonDisabled={submitButtonDisabled}
            handleOptionSelect={handleOptionSelect}
            handleQuizSubmit={handleQuizSubmit}
            handleGetNextQuestion={handleGetNextQuestion}
            corrected={corrected}
            explanation={explanation}
            submitted={submitted}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Questions;
