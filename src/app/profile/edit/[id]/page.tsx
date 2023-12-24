"use client";

import Loading from "@/components/Loading";
import CategoriesBanner from "@/components/admins/categories/CategoriesBanner";
import Footer from "@/components/footer/Footer";
import { UploadImageToImageBB } from "@/helpers/imageUpload";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/users/userApi";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const title = "Update Profile";
  const description =
    "For the first time please update your all information other wise you will get an error";
  const router = useRouter();

  const { id } = useParams();
  const { data: user, isLoading } = useGetSingleUserQuery(id);
  const [updateSingleUser] = useUpdateSingleUserMutation();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return <Loading />;
  }
  const handleProfileUpdate = async (data: any) => {
    let profileImage = null;
    try {
      setLoading(true);

      if (data.file[0]) {
        profileImage = await UploadImageToImageBB(data.file[0]);
      }

      const requestedData = {
        name: data.name || user.name,
        phone: data.phone || user.phone,
        bio: data.bio || user.bio,
        image: profileImage || user.image,
        age: data.age || user.age,
      };

      const result: any = await updateSingleUser(requestedData);
      if (result.success !== false) {
        toast.success("Profile updated successfully");
      }
      router.back();
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <CategoriesBanner title={title} description={description} />
      <div className="px-[30px] md:px-[50px]">
        {/* update user info */}
        <div className="flex justify-center items-center mt-7 mb-10">
          <form
            className="p-5 border border-gray-400 rounded"
            onSubmit={handleSubmit(handleProfileUpdate)}
          >
            <p className="text-center text-xl font-medium">Update Profile</p>
            <div className="flex flex-col gap-1 ">
              <label className="ml-2">Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                {...register("name")}
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="ml-2">email</label>
              <input
                type="text"
                defaultValue={user?.email}
                disabled
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="ml-2">Phone</label>
              <input
                type="text"
                {...register("phone")}
                defaultValue={user?.phone}
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="ml-2">Age</label>
              <input
                type="text"
                defaultValue={user?.age}
                {...register("age")}
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full"
              />
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label className="ml-2">Image</label>
              <input
                type="file"
                {...register("file")}
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full"
              />
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label className="ml-2">Bio</label>
              <input
                type="text"
                {...register("bio")}
                defaultValue={user?.bio}
                className="px-3 py-2 rounded border border-gray-400 outline-none md:w-[400px] w-full"
              />
            </div>
            <div>
              <button
                className={`mt-3 px-3 py-2 rounded bg-green-400 hover:bg-green-500 transition w-full ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                type="submit"
              >
                {loading ? "Loading ..." : "Update Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProfile;
