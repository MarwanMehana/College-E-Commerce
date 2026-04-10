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
import RegisterForm from "../_components/Authentication/RegisterForm/RegisterForm";


const Register = () => {

  return (
    <section className="container mx-auto py-20 flex justify-center ">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl border-0 text-sm">
        <CardHeader>
          <CardTitle className="text-green-800">Create an account</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your details below to register a new account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm/>
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-green-900">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Register;
