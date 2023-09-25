"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login Successful");
      console.log("Login Successful: ", response.data);
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed: ", error);
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
      <h1>{isLoading ? "Logging In-Process" : "Login Form"}</h1>
      <div className="p-2 flex flex-col border border-gray-300">
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
        <button onClick={onLogin}>
          {buttonDisabled ? "NO Login" : "Login"}
        </button>
      </div>
      <Link href={"/signup"}>Visit SignUp</Link>
    </div>
  );
};

export default Login;
