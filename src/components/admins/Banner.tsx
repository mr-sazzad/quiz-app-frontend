import Image from "next/image";
import Link from "next/link";
import React from "react";

import { HiOutlineArrowSmRight } from "react-icons/hi";

const Banner = () => {
  return (
    <div className="flex justify-center items-center md:h-[400px] h-[300px] w-full">
      <div className="px-[30px] md:[px-50px]">
        <p className="sm:text-5xl text-4xl md:text-6xl font-bold mb-3 text-center">
          MindMingle The Ultimate Quizventure
        </p>
        <p className="text-gray-600">
          Dive into the ultimate quizventure with MindMingle, where knowledge
          meets excitement. Challenge your intellect, explore diverse topics,
          and conquer the quest for wisdom in this thrilling quiz experience
        </p>

        {/* button part */}
        <div className="mt-5 flex justify-center">
          <Link
            href="/admin/quiz"
            className="px-5 py-2 rounded-full bg-green-400 hover:bg-green-500 transition flex items-center gap-2 group"
          >
            Go To Dashboard
            <HiOutlineArrowSmRight className="text-[22px] transform -rotate-[30deg] group-hover:rotate-0 transition duration-300 bg-white rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
