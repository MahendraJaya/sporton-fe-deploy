"use client";

import Button from "@/app/(landing)/components/ui/button";
import { login } from "@/app/services/auth.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/admin/products");
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const res = await login(credentials);

      if (res.token) router.push("/admin/products");
    } catch (error) {
      console.error("🚀 ~ handleLogin ~ error:", error);
      
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary py-12 px-[72px]">
        <Image
          src="/images/logo-admin.svg"
          alt="logo admin"
          width={304}
          height={51}
          className="mx-auto mb-4"
        />
        <p className="opacity-50 text-sm text-center mb-9">
          Enter your credentials to access the dashboard
        </p>

        {errorMessage && (
          <div className="px-3 py-1 bg-primary-light border border-primary rounded-md text-primary text-sm text-center ">
            {errorMessage}
          </div>
        )}

        <div className="input-group-admin mb-5">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Please type your email"
            className="rounded-lg!"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="input-group-admin mb-12">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••••••••••••••"
            className="rounded-lg!"
            onChange={(e) => {
              setCredentials((prev) => ({ ...prev, password: e.target.value }));
            }}
          />
        </div>
        <Button
          className="w-full rounded-lg! mb-8"
          onClick={() => {
            handleLogin();
          }}
        >
          {isLoading ? "Signing in....." : "Sign In"}
        </Button>
      </div>
    </main>
  );
};

export default LoginPage;
