import { IQuestion } from "@/types";
import React from "react";

const QuestionHeader = ({
  questions,
  quizQuestions,
}: {
  questions: IQuestion[];
  quizQuestions: IQuestion[];
}) => {
  return (
    <div className="h-[160px] w-[100vw] bg-[#EBF2FF] flex justify-center items-center">
      <div>
        <p className="text-3xl font-semibold z-50 text-center mb-3">
          Questions Page
        </p>
        <p className="text-sm text-center">
          Total Questions: {questions.length}
        </p>
        <p className="text-sm text-center">
          Remaining: {quizQuestions.length - 1}
        </p>
      </div>
    </div>
  );
};

export default QuestionHeader;
