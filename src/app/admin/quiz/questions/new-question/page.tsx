"use client";
import React, { useEffect, useState } from "react";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import SelectCategory from "@/components/admins/select/SelectCategory";
import { useCreateQuestionMutation } from "@/redux/api/questions/questionApi";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers/localStorage";

import { BsPatchPlus } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Footer from "@/components/footer/Footer";
import { useRouter } from "next/navigation";

const NewQuestion = () => {
  const title = "Create a new Question";
  const description =
    "Please follow the instructions to create a new Question.";
  const router = useRouter();

  // State to keep track of input elements
  const [hover, setHover] = useState(false);
  const [question, setQuestion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answersValue, setAnswersValue] = useState("");
  const [answerHover, setAnswerHover] = useState(false);
  const [inputs, setInputs] = useState([{ value: "" }]);

  useEffect(() => {
    const categoryID = getFromLocalStorage("categoryIdOfQuestion");

    if (categoryID) {
      setCategoryId(categoryID);
    }
  }, [categoryId]);

  const [createQuestion, { isLoading }] = useCreateQuestionMutation();

  // Function to handle adding new input element
  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

  // Function to handle question creation
  const handleQuestionCreation = async () => {
    const inputValues = inputs.map((input) => input.value);
    const answers: number[] = answersValue
      .split(",")
      .map((num: string) => parseInt(num));

    const requestedData = {
      text: question,
      options: inputValues,
      correctAnswers: answers,
      explanation,
      categoryId,
    };

    const result: any = await createQuestion(requestedData);

    if (result.success !== false) {
      toast.success("Question created successfully");
      removeFromLocalStorage("categoryIdOfQuestion");
      router.back();
    } else {
      toast.error("Something went wrong");
    }
  };

  // Function to handle change in answer input
  const handleInputChange = (e: any) => {
    setAnswersValue(e.target.value);
  };

  const refetch = () => {
    const categoryID = getFromLocalStorage("categoryIdOfQuestion");
    if (categoryID) {
      setCategoryId(categoryID);
    }
  };

  return (
    <div className="mb-14 md:mb-0">
      <CategoriesBanner title={title} description={description} />

      <div className="mt-10">
        <p className="mt-2 text-sm text-gray-600 md:px-[50px] px-[30px] text-center">
          Please Select a Category For Creating Question
        </p>
        <SelectCategory
          itemName="categoryIdOfQuestion"
          name="Select"
          refetch={refetch}
        />
      </div>

      <div
        className={`flex justify-center items-center ${
          categoryId === "" ? "hidden" : "flex"
        }`}
      >
        <div className="sm:max-w-[400px] w-full mt-10 border border-gray-300 p-5 rounded">
          <div>
            <label className="mb-3 ml-2">Question</label>
            <input
              className="w-full px-3 py-2 rounded outline-none border border-gray-400"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {/* Options section */}
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <p>Options</p>
                <div className="relative">
                  <IoInformationCircleOutline
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                  />
                  <div
                    className={`absolute left-4 -top-[50px] ${
                      hover ? "flex" : "hidden"
                    }`}
                  >
                    <p className="text-xs p-2 border border-gray-400 rounded bg-gray-100 w-[200px]">
                      If you want to create more options please click on plus
                      icon
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddInput}
                className="mt-1 hover:text-gray-500 transition"
              >
                <BsPatchPlus />
              </button>
            </div>
            {inputs.map((input, index) => (
              <input
                key={index}
                className="w-full px-3 py-2 rounded outline-none border border-gray-400 mt-2"
                value={input.value}
                onChange={(e) => {
                  const newInputs = inputs.slice(); // Create a copy of the inputs array
                  newInputs[index].value = e.target.value;
                  setInputs(newInputs);
                }}
              />
            ))}
            {/* Correct answers */}
            <div className="mt-3">
              <div className="flex gap-2 items-center">
                <p>Correct Answers</p>
                <div className="relative">
                  <IoInformationCircleOutline
                    onMouseOver={() => setAnswerHover(true)}
                    onMouseOut={() => setAnswerHover(false)}
                  />
                  <div
                    className={`absolute left-4 -top-[60px] ${
                      answerHover ? "flex" : "hidden"
                    }`}
                  >
                    <p className="text-xs p-2 border border-gray-400 rounded bg-gray-100 w-[200px]">
                      Please write the indexes of correct answers separated by a
                      comma.
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="text"
                className="w-full px-3 py-2 rounded outline-none border border-gray-300"
                value={answersValue}
                onChange={handleInputChange}
              />
            </div>

            {/* Explanation */}
            <div className="mt-3">
              <label>Explanation</label>
              <input
                type="text"
                className="w-full px-3 py-2 rounded outline-none border border-gray-300"
                onChange={(e) => setExplanation(e.target.value)}
              />
            </div>

            <button
              className="w-full px-3 py-2 rounded outline-none bg-green-400 hover:bg-green-500 transition mt-3"
              onClick={handleQuestionCreation}
            >
              {isLoading ? "Loading .." : "Create Question"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewQuestion;
