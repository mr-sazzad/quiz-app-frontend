"use client";

import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "@/helpers/localStorage";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Corrected import path
import React, { useEffect, useState } from "react";

const Score = () => {
  const router = useRouter();
  const title = "Congratulations_";
  const description = "we are celebrating your success";

  // Allow state to be string or null
  const [correctAnswers, setCorrectAnswers] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<string | null>(null);

  // State for countdown
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    setCorrectAnswers(getFromLocalStorage("quizScore"));
    setTotalQuestions(getFromLocalStorage("TotalQuizzes"));

    // Set up a timer for countdown
    const timerId = setInterval(() => {
      setCountdown((currentCountdown) => {
        if (currentCountdown <= 1) {
          clearInterval(timerId);
          handleResetLocalStorage();
          return 0;
        }
        return currentCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const handleResetLocalStorage = () => {
    removeFromLocalStorage("quizScore");
    removeFromLocalStorage("TotalQuizzes");

    router.push("/");
  };

  if (correctAnswers === null || totalQuestions === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <CategoriesBanner title={title} description={description} />

      <div className="flex justify-center items-center w-full mt-5">
        <div className="flex flex-col gap-3">
          <div className="relative h-[130px] w-[190px]">
            <Image src="/assets/award.png" alt="award" fill priority />
          </div>
          <div className="flex justify-center">
            <div className="flex gap-1 items-center">
              <p className="text-3xl font-bold">{correctAnswers}</p>
              <p className="text-xl font-bold">/</p>
              <p className="text-3xl font-bold">{totalQuestions}</p>
            </div>
          </div>
          {/* Countdown display */}
          {countdown > 0 && (
            <div className="text-center mt-4">
              <p className="px-3 py-2 rounded bg-green-400 hover:bg-green-500 transition duration-300">
                Redirecting in {countdown} ...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Score;
