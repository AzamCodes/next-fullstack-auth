"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signUpSchema } from "@/lib/signUpSchema";
type Inputs = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(signUpSchema),
  });

  const onSignUp: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", data);
      console.log("SignUp Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed!", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const watchFields = watch(["username", "email", "password"]);
  useEffect(() => {
    const [username, email, password] = watchFields;
    if (username && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [watchFields]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <form
        className="flex flex-col gap-6 items-center px-4 w-full  mt-16 justify-center"
        onSubmit={handleSubmit(onSignUp)}
      >
        <div className="w-full md:w-[40%] min-h-full shadow-2xl pt-6 px-4 pb-6 md:px-6  md:min-h-[60vh] bg-white/5  rounded-xl backdrop-blur-[100px]   border-none ">
          <h2 className="text-green-400 text-2xl">
            {loading ? "Processing" : "SignUp"}
          </h2>
          <div className=" flex justify-center flex-col pt-6 gap-3">
            <label htmlFor="username">Username</label>
            <input
              className="py-1 px-1 text-sm rounded-sm bg-transparent border-b-[1px] border-gray-400  focus:border-b-[1.5px] focus:border-green-500 focus:outline-none"
              type="text"
              id="username"
              placeholder="username"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}

            <label htmlFor="email">Email</label>
            <input
              className="py-1 px-1 text-sm rounded-sm bg-transparent border-b-[1px] border-gray-400  focus:border-b-[1.5px] focus:border-green-500 focus:outline-none"
              type="email"
              id="email"
              placeholder="email"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}

            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password">Password</label>
              <input
                className="py-1 px-1 text-sm rounded-sm bg-transparent border-b-[1px] border-gray  focus:border-b-[1.5px] focus:border-green-500 focus:outline-none"
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="password"
                {...register("password")}
              />
              <span
                className="absolute right-2 top-8 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-green-500" />
                ) : (
                  <FaEye />
                )}
              </span>
              {errors.password?.message && (
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-2 items-center ">
              <button
                type="submit"
                className="border-transparent cursor-pointer px-3 outline-none bg-white text-black hover:text-white hover:bg-green-600 transition-all mt-3 py-[0.40rem] rounded-lg"
                disabled={buttonDisabled}
              >
                {buttonDisabled ? "No SignUp" : " SignUp Here"}
              </button>
              <Link
                className="hover:underline hover:text-green-500 mt-2 items-center transition-all"
                href={"/login"}
              >
                Visit Login Page
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
