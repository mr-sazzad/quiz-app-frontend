"use client";

import Loading from "@/components/Loading";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import Footer from "@/components/footer/Footer";
import { getUserFromLocalStorage } from "@/helpers/jwt";
import { useGetSingleUserQuery } from "@/redux/api/users/userApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const title = "Your Profile";
  const description =
    "keep updating your profile and getting updates for your website";
  const router = useRouter();

  const currentUser = getUserFromLocalStorage() as any;

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  });

  const { data: user, isLoading } = useGetSingleUserQuery(currentUser?.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <CategoriesBanner title={title} description={description} />
      <div className="px-[30px] md:px-[50px]">
        <div className="flex justify-center items-center">
          <div className="flex flex-col md:w-[500px] w-full border border-gray-400 rounded mt-5 p-5 mb-10">
            {/* profile image */}
            <div className="flex justify-center">
              <div className="relative w-[70px] h-[70px] p-1 border-2 border-gray-400 rounded-full">
                <Image
                  src={user?.image || "/assets/placeholder.png"}
                  alt="profile-image"
                  fill
                  priority
                  className="rounded-full"
                />
              </div>
            </div>
            {/* name and bio */}
            <div>
              <h2 className="text-xl font-medium text-center">{user?.name}</h2>
              <p className="text-sm text-gray-500 text-center">
                {user?.bio ? user?.bio : "please update your bio"}
              </p>
            </div>

            {/* information */}
            <p className="text-lg text-gray-600 font-medium mt-5">
              Your Information
            </p>
            <div className="flex flex-col gap-2">
              <p className="px-3 py-2 rounded border border-gray-400">
                <span className="text-gray-900 bg-gray-100">Email:</span>{" "}
                {user?.email}
              </p>
              <p className="px-3 py-2 rounded border border-gray-400">
                <span className="text-gray-900 bg-gray-100">Phone:</span>{" "}
                {user?.phone ? user?.phone : "Update your number"}
              </p>
              <p className="px-3 py-2 rounded border border-gray-400">
                <span className="text-gray-900 bg-gray-100">Age:</span>{" "}
                {user?.age ? user?.age : "Update your age"}
              </p>
            </div>

            {/* Quiz Info */}
            <div className="mt-3">
              <p className="text-lg text-gray-600 font-medium">
                Your Activities
              </p>
              <p className="px-3 py-2 rounded border border-gray-400">
                <span className="text-gray-900 bg-gray-100">Your Score:</span>
                <span className="ml-1">{user?.score}</span>
              </p>
              {/* attend questions */}
              <p className="px-3 py-2 rounded border border-gray-400 mt-2">
                <span className="text-gray-900 bg-gray-100">Total attend:</span>
                <span className="ml-1">{user?.totalQuestion}</span>
              </p>
            </div>

            <div>
              <button
                className="px-4 py-2 rounded bg-green-400 hover:bg-green-500 transition mt-3 w-full"
                onClick={() => router.push(`/profile/edit/${user?.id}`)}
              >
                Edit your profile
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
