import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="flex justify-center items-center gap-5 px-[30px] md:px[50px] my-10">
      <div className="mt-10">
        <div className="flex justify-center items-center">
          <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold lg:leading-[80px] md:leading-[70px] leading-[45px] max-w-[800px] text-center">
            Quizzify: Where Learning{" "}
            <span className="text-green-400">Meets</span> Fun
          </h1>
        </div>
        <p className="text-gray-500 max-w-[800px] text-center">
          Quizzify is not just a quiz app; it&lsquo;s an educational adventure!
          Test your knowledge, learn fascinating facts, and challenge your
          friends to see who reigns supreme in the world of trivia.
        </p>
        <div className="flex justify-center items-center">
          <Link
            href={"/questions"}
            className="px-4 py-2 rounded-l-full bg-green-400 hover:bg-green-500 transition duration-200 mt-5"
          >
            Take A Quiz
          </Link>
          <Link
            href="/leaderboard"
            className="px-4 py-2 rounded-r-full bg-green-400 hover:bg-green-500 transition duration-200 mt-5"
          >
            Leader Board
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
