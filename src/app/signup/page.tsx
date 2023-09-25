"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Successfully SignUp!");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1>{isLoading ? "Signing In-Process" : "Sign Up Form"}</h1>
      <div className="p-2 flex flex-col border border-gray-300">
        <label htmlFor="username">UserName</label>
        <input
          className="text-black"
          type="text"
          id="username"
          placeholder="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          className="text-black"
          type="email"
          id="email"
          placeholder="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          className="text-black"
          type="password"
          id="password"
          placeholder="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button onClick={onSignUp}>
          {buttonDisabled ? "NO SignUp" : "SignUp"}
        </button>
      </div>
      <Link href={"/login"}>Visit Login</Link>
    </div>
  );
};

export default SignUp;
