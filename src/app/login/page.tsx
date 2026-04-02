import React from "react";
import Link from "next/link";

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// component
import LoginForm from "../_components/Authentication/RegisterForm/LoginForm";


const Login = () => {
  return (
    <section className="container mx-auto py-20 flex justify-center h-screen">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl border-0 text-sm">
        <CardHeader>
          <CardTitle className="text-green-800">Login to your account</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your details below to login a your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link href="/register" className="underline hover:text-green-900">
              register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
