"use client";

import { getUserFromLocalStorage } from "@/helpers/jwt";
import { setToLocalStorage } from "@/helpers/localStorage";
import { useLoginUserMutation } from "@/redux/api/users/userApi";
import { ILoginCredentials } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginCredentials>();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: ILoginCredentials) => {
    try {
      const result: any = await loginUser(data);

      // Check if 'error' property exists in the result.data object
      if (result?.data?.error) {
        toast.error("Something went wrong during login.");
      } else if (result?.data?.success !== false) {
        setToLocalStorage("access-token", result?.data);
        const user = getUserFromLocalStorage() as any;

        if (user) {
          if (user.role === "admin") {
            router.push("/admin/home");
          } else {
            router.push("/");
          }
        }
        toast.success("User signed in");
      } else {
        toast.error("Something went wrong during login.");
      }
    } catch (error) {
      toast.error("Failed to sign in.");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto w-full h-[85vh] flex justify-center items-center">
      <div className="flex flex-col md:flex-row justify-between md:items-center lg:px-[50px] px-[30px] py-10 w-full">
        {/* banner part */}
        <div className="flex-1 mb-10 md:mb-0">
          <div className="flex justify-center items-center">
            <div>
              <h2 className="text-center text-2xl font-semibold">Quizzify:</h2>
              <p className="text-center">Login</p>
            </div>
          </div>
        </div>

        {/* form part */}
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-2xl font-semibold">Sign In</p>
          <form
            className="flex flex-col justify-center gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.email && (
              <span className="text-red-500 -mt-4 text-sm pl-3">
                Email is required
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="w-full border-b border-gray-300 outline-none p-3 focus:border-black transition duration-300 bg-transparent"
            />
            {errors.password && (
              <span className="text-red-500 -mt-4 text-sm pl-3">
                Password is required
              </span>
            )}
            <button
              className="p-2 bg-gray-200 hover:bg-green-500 hover:text-white transition duration-1000 rounded"
              type="submit"
            >
              {isLoading ? "Loading ..." : "Sign in"}
            </button>
          </form>
          <div className="mt-5 flex gap-1 items-center">
            <p className="text-gray-600">Don&lsquo;t have an account yet?</p>
            <Link href="/sign-up" className="underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
