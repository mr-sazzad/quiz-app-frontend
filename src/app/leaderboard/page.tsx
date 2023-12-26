"use client";

import Loading from "@/components/Loading";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import Footer from "@/components/footer/Footer";
import { useGetAllUsersQuery } from "@/redux/api/users/userApi";
import Image from "next/image";
import React from "react";

const LeaderBoard = () => {
  const title = "Leader Board";
  const description =
    "See who's leading in the quiz. Our leaderboard showcases the names and scores of the top quiz-takers";

  const { data: users, isLoading } = useGetAllUsersQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-14 md:mb-0">
      <CategoriesBanner title={title} description={description} />
      <div className="flex justify-center mt-10">
        <div className="md:w-[600px] w-full border border-gray-400 rounded">
          {users?.map((user: any) => (
            <div className="p-5" key={user.id}>
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
                <div className="relative h-[50px] w-[50px] rounded-full p-2 border border-gray-400">
                  <Image
                    src={user.image || "/assets/cover.png"}
                    alt=""
                    fill
                    className="overflow-hidden rounded-full"
                  />
                </div>
                <div>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p>{user.score}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderBoard;
