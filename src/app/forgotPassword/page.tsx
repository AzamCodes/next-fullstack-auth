"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema from "@/lib/forgotPasswordSchema";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  type Inputs = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const newPass: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotPass", {
        data,
      });
      reset();
      toast.success("Your password has been changed.", {
        duration: 4000,
      });
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
    setValue("token", urlToken || "");
  }, [setValue]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(newPass)}
      className="flex justify-center px-4 py-32 md:py-32 selection:bg-black selection:text-green-500"
    >
      <div className="w-full md:w-[50%] xl:w-[60%] min-h-full pb-6 shadow-2xl px-3 md:px-6 py-4 md:min-h-[25vh] lg:min-h-[28vh] xl:min-h-[60vh] bg-white/5 rounded-xl backdrop-blur-[100px] border-none">
        <h2 className="text-green-500 text-2xl">
          {loading ? "Processing" : "SetUp New Password"}
        </h2>
        <div className="flex justify-center pt-6 flex-col gap-3">
          <div className="flex justify-center flex-col gap-3 relative">
            <label htmlFor="pass">New Password</label>
            <input
              className="bg-inherit px-[0.35rem] py-2 rounded-lg focus:ring-green-600 outline-none placeholder:text-green-300 focus:border-green-600 border-[1.1px] border-green-700"
              type={passwordVisible ? "text" : "password"}
              id="pass"
              {...register("pass", { required: true })}
              placeholder="Enter New Password"
            />
            <span
              className="absolute right-2 top-12 items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.pass?.message && (
              <p className="text-sm text-red-400">{errors.pass.message}</p>
            )}
          </div>
          <div className="flex justify-center flex-col gap-3 relative">
            <label htmlFor="confirmp">Confirm Password</label>
            <input
              className="bg-inherit px-[0.35rem] py-2 rounded-lg focus:ring-green-600 outline-none placeholder:text-green-300 focus:border-green-600 border-[1.1px] border-green-700"
              type={passwordVisible ? "text" : "password"}
              id="confirmp"
              {...register("confirmp", { required: true })}
              placeholder="Confirm New Password"
            />
            <span
              className="absolute right-2 top-12 items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <FaEyeSlash />
              ) : (
                <FaEye className="text-green-500" />
              )}
            </span>
            {errors.confirmp?.message && (
              <p className="text-sm text-red-400">{errors.confirmp.message}</p>
            )}
          </div>
          <button className="border-transparent cursor-pointer outline-none bg-white text-black hover:text-white hover:bg-green-600 transition-all mt-3 py-[0.40rem] rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
