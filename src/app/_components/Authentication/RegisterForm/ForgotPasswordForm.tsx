"use client";
import React from "react";

// ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

// types
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

type InputField<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  title: string;
  type: React.HTMLInputTypeAttribute; 
};

const ForgotPasswordForm = <TFormValues extends FieldValues>({
  bigTitle,
  title,
  buttonTitle,
  inputs,
  form,
  onSubmit,
}: {
  bigTitle: string;
  title: string;
  buttonTitle: string;
  inputs: InputField<TFormValues>[];
  form: UseFormReturn<TFormValues>;
  onSubmit: (values: TFormValues) => void;
}) => {
  return (
    <section className="container mx-auto flex justify-center">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl border-0 text-sm">
        <CardHeader>
          <CardTitle className="text-green-800">{bigTitle}</CardTitle>
          <CardDescription className="text-gray-600">{title}</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {inputs.map((input, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={input.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{input.title}:</FormLabel>
                      <FormControl>
                        <Input type={input.type} {...field} required />
                      </FormControl>
                      <FormDescription />
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                variant="outline"
                type="submit"
                className="bg-green-800 hover:bg-green-700 text-white"
              >
                {buttonTitle}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPasswordForm;
