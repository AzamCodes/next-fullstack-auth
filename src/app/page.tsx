"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    // console.log(res.data.data.username);
    setData(res.data.data.username);
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between py-5 px-6">
        <h2 className="text-2xl font-bold">
          DEV<span className="text-green-400">LOCK</span>
        </h2>
        <button className="bg-transparent hover:bg-green-600 text-green border-green-400 border transition-all font-semibold py-2 px-4 rounded-md">
          <Link href={"/profile"}>View Profile</Link>
        </button>
      </div>
      <div className="flex w-full px-11 pt-10 text-xl md:text-2xl items-center">
        <h1>
          Welcome back <span>👋</span>@{data}
        </h1>
      </div>
    </>
  );
}
