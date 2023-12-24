"use client";

import Loading from "@/components/Loading";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
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
    <div>
      <CategoriesBanner title={title} description={description} />
      <div className="flex justify-center mt-10">
        <div className="w-full border border-gray-400 rounded">
          {users?.map((user: any) => (
            <div className="p-5" key={user.id}>
              <div className="flex justify-between items-center border border-gray-300 p-2 rounded">
                {" "}
                <div className="relative h-[50px] w-[50px] rounded-full p-2 border border-gray-400">
                  <Image
                    src={user.image || "/assets/placeholder.png"}
                    alt=""
                    fill
                    className="overflow-hidden"
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
    </div>
  );
};

export default LeaderBoard;
