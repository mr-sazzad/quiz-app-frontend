import Link from "next/link";
import React from "react";

import { HiOutlineArrowSmRight } from "react-icons/hi";

const CreateQuestion = () => {
  return (
    <div className="flex justify-end px[30px] md:px-[50px]">
      <Link
        href="/admin/quiz/questions/new-question"
        className="px-5 py-2 bg-green-400 hover:bg-green-500 transition duration-200 rounded flex gap-2 items-center group"
      >
        Create A Question
        <HiOutlineArrowSmRight className="text-[22px] transform -rotate-[30deg] group-hover:rotate-0 transition duration-300 bg-white rounded-full" />
      </Link>
    </div>
  );
};

export default CreateQuestion;
