"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const [errorLogin, seterrorLogin] = useState("");
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.error) {
      seterrorLogin("User o Password incorrect");
      return res.error;
    } else {
      router.push("/dashboard");
    }
  });

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            {errorLogin && <span className="text-red-500">{errorLogin}</span>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <p className="text-sm text-center">
              Dont have an account?
              <Link
                href="/auth/register"
                className="text-primary hover:underline"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
