"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <>
      <div className="flex justify-between items-center py-5 px-6">
        <h1 className="text-2xl text-green-500">Profile</h1>
        <button
          onClick={logout}
          className="bg-transparent hover:bg-green-600 text-green border-green-400 border transition-all font-semibold py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center gap-3 text-xs  md:text-sm  justify-center min-h-screen py-2">
        <div className="flex gap-1 items-center">
          <p>Profile ID:</p>
          <h2 className="p-1 rounded bg-green-500">
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>
        </div>
        <hr />
        <div className="flex text-xs  md:text-sm  items-center gap-2">
          <h3>Click the button to view User details:</h3>
          <span>
            <button
              onClick={getUserDetails}
              className="bg-green-800  hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg"
            >
              GetUser Details
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
