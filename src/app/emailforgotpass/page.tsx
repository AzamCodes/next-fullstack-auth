"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SendEmailForgotpassSchema } from "@/lib/SendEmailForgotpassSchema";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
const EmailForgotPass = () => {
  // const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  type Inputs = z.infer<typeof SendEmailForgotpassSchema>;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(SendEmailForgotpassSchema),
  });

  const shootmail: SubmitHandler<Inputs> = async (email) => {
    try {
      console.log(email);
      const response = await axios.post("/api/users/Emailforgotpass", {
        email,
      });
      toast.success("Password reset email sent!");
      console.log("Shoot mail success", response.data);
    } catch (error: any) {
      toast.error(
        "There was an error sending the password reset email. Please try again later."
      );
      console.log(error.message);
    }
  };

  const watchFields = watch(["email"]);

  useEffect(() => {
    const [email] = watchFields;

    if (
      (typeof email === "string" && email.length > 0) ||
      (typeof email === "number" && email > 0)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [watchFields]);

  return (
    <>
      <form
        onSubmit={handleSubmit(shootmail)}
        className="flex flex-col items-center justify-center min-h-screen  px-4 py-32 md:py-32 "
      >
        <div className="w-full md:w-[40%] min-h-full  shadow-2xl px-3 md:px-6 py-4 md:min-h-[18vh] lg:min-h-[28vh]  xl:min-h-[32vh] bg-white/5   rounded-xl backdrop-blur-[100px]   border-none ">
          <h1 className="text-green-500 text-2xl">
            {loading ? "Processing" : "Login"}
          </h1>
          <div className=" flex justify-center pt-3 flex-col gap-3">
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

            <button
              disabled={buttonDisabled}
              className="border-transparent  cursor-pointer  outline-none bg-white text-black hover:text-white hover:bg-green-600 transition-all mt-3 py-[0.40rem] rounded-lg"
            >
              {buttonDisabled ? "No Send" : "Send"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EmailForgotPass;
