"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginSchema } from "@/lib/loginSchema";

type Inputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  // const [user, setUser] = React.useState({
  //   email: "",
  //   password: "",
  // });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onLogin: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", data);
      // console.log("Login success", response.data);
      const status = response.data.status;
      if (status === 400) {
        toast.error("Invalid Credentials");
      }
      reset();
      toast.success("Logged in successfully.", {
        duration: 3000,
      });
      router.push("/");
    } catch (error: any) {
      // console.log("Login failed", error.message);
      toast.error(
        "There was an issue with your login credentials. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const watchFields = watch(["email", "password"]);
  useEffect(() => {
    const [email, password] = watchFields;
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [watchFields]);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex justify-center px-4 py-28 md:py-16 selection:bg-gray-600 selection:text-green-500 "
    >
      <div className="w-full md:w-[55%] lg:w-[40%] min-h-full shadow-2xl px-3  md:px-6 py-4 md:min-h-[31vh]  lg:min-h-[60vh] bg-white/5   rounded-xl backdrop-blur-[100px]   border-none ">
        <h1 className="text-green-500 pt-1 md:pt-3 font-semibold text-2xl">
          {loading ? "Processing" : "Login"}
        </h1>

        <div className=" flex justify-center pt-6 flex-col gap-3">
          <label htmlFor="email">Email</label>
          <input
            className="bg-inherit px-[0.35rem] py-2 rounded-lg focus:ring-green-600 outline-none placeholder:text-green-300 focus:border-green-600 border-[1.1px]  border-green-700"
            id="email"
            type="text"
            placeholder="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 relative ">
          <label htmlFor="password">Password</label>
          <input
            className="bg-inherit px-[0.35rem] py-2 rounded-lg focus:ring-green-600 outline-none placeholder:text-green-300 focus:border-green-600 border-[1.1px]  border-green-700"
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="password"
            {...register("password")}
          />
          <span
            className="absolute right-2 top-11 items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password?.message && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
          <button
            disabled={buttonDisabled}
            className="border-transparent text-xs md:text-sm  cursor-pointer  outline-none bg-white text-black hover:text-white hover:bg-green-600 transition-all mt-3 py-[0.35rem] rounded-lg"
          >
            {buttonDisabled ? "No Send" : "Send"}
          </button>
        </div>
        <div className="flex justify-between items-center pt-4 ">
          <button className="hover:text-green-400 text-xs  md:text-sm transition-all">
            <Link href={"/emailforgotpass"}>Forgot Password?</Link>
          </button>
          <span className="gap-[2px] md:gap-2 text-xs md:text-sm   flex items-center">
            <p className=" text-nowrap items-center">
              Don&apos;t Have an account?
            </p>
            <Link
              className="hover:text-green-400  hover:underline-offset-1 hover:underline transition-all"
              href={"/signup"}
            >
              SignUp
            </Link>
          </span>
        </div>
        {/* <button
          disabled={buttonDisabled}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>

        <Link href="/emailforgotpass">forgot Password?</Link>
        <Link href="/signup">Visit Signup page</Link> */}
      </div>
    </form>
  );
}
