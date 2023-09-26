"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState("Noon");
  const handleLogOut = async () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        console.log("Logout Successful");
        router.push("/login");
      })
      .catch((err: any) => {
        console.log("Logout Failed: ", err.message);
      });
  };

  const getUserDetails = async () => {
    const { data } = await axios.get("/api/users/me");
    setData(data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Main ProfilePage</h1>
      <h2 className="p-1 rounded bg-green-500">
        {data === "Noon" ? (
          "Amma Nothing"
        ) : (
          <Link href={`/profile/${data}`}>Go to User</Link>
        )}
      </h2>
      <button
        className="bg-transparent my-3 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleLogOut}
      >
        LogOut
      </button>
      <button
        className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded"
        onClick={getUserDetails}
      >
        GetUser Details
      </button>
    </div>
  );
};

export default ProfilePage;
