"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react"; // Import Loader2 icon from lucide-react
import { useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FileUpload from "./FileUpload";

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = type === "SIGN_IN";
  const [isLoading, setIsLoading] = useState(false);
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
    mode: "onChange", // Enable validation on change
  });

  // Watch password fields for real-time validation
  const password = form.watch("password" as Path<T>);
  const rePassword = form.watch("rePassword" as Path<T>);

  // Update validation state when passwords change
  useEffect(() => {
    if (!isSignIn && password && rePassword && password !== rePassword) {
      form.setError("rePassword" as Path<T>, {
        type: "manual",
        message: "Passwords do not match",
      });
    } else if (!isSignIn && rePassword) {
      form.clearErrors("rePassword" as Path<T>);
    }
  }, [password, rePassword, form, isSignIn]);

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    setIsLoading(true);
    try {
      const result = await onSubmit(data);

      if (result.success) {
        router.push("/");
        toast.success("Success", {
          description: isSignIn
            ? "You have successfully signed in"
            : "You have successfully signed up",
        });
      } else {
        toast.error(`Error ${isSignIn ? "signing In" : "signing Up"}`, {
          description: result.error ?? "An error occurred",
        });
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter fields based on form type
  const fieldsToRender = Object.keys(defaultValues).filter((field) => {
    // Only show rePassword field on SIGN_UP forms
    if (field === "rePassword" && isSignIn) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-base-100">
        {isSignIn ? "Welcome back to BookWise!" : "Create Your Libary Account"}
      </h1>
      <p className="text-base-200 text-md font-light text-muted-foreground">
        {isSignIn
          ? "Access the vase collections of resources, and Stay update"
          : "Please complete all fields and upload a valid university ID to gain access to the libary"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full "
        >
          {fieldsToRender.map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        accept="image/*"
                        placeholder="Upload Your ID"
                        folder="ids"
                        variant="dark"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="w-full min-h-14 border-1  rounded-md bg-secondary/20 text-base font-bold placeholder:font-normal text-base-100 placeholder:text-base-100/70 focus-visible:ring-1 focus-visible:ring-primary"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="btn-primary w-full"
            size={"lg"}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {isSignIn ? "Signing In..." : "Signing Up..."}
              </span>
            ) : isSignIn ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>
      <p className="text-center font-medium text-base">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="text-primary font-bold hover:underline"
        >
          {isSignIn ? "Create an account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
