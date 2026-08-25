import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { PasswordInput } from "./Password-Input";
import { Link, useActionData, useNavigation, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "../icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const formSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 digits")
    .max(8, "Password must be at most 8 digits")
    .regex(/^[0-9]+$/, "Password must contain only numbers"),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 digits")
    .max(8, "Password must be at most 8 digits")
    .regex(/^[0-9]+$/, "Password must contain only numbers"),
});

export function ConfirmPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as {
    error?: string;
    message?: string;
  };

  const [clientError, setClientError] = useState<string | null>(null);

  const isSubmitting = navigation.state === "submitting";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.password !== values.confirmPassword) {
      setClientError("Password do not match");
      return;
    }
    setClientError(null);
    submit(values, {
      method: "post",
      action: "/register/confirm-password",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link to="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
            </div>
            <span className="sr-only">Confirm Password</span>
          </Link>
          <h1 className="text-xl font-bold">Please confirm your password</h1>
          <FieldDescription>
            Passwords must be 8 digits long and contain only numbers. They must
            match.
          </FieldDescription>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            autoComplete="off"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      minLength={8}
                      maxLength={8}
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      minLength={8}
                      maxLength={8}
                      required
                      inputMode="numeric"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {actionData && (
              <div className="flex gap-2">
                <p className="text-xs text-red-400">{actionData?.error}</p>
                <Link
                  to="/register"
                  className="text-xs underline underline-offset-4"
                >
                  Go back to Register
                </Link>
              </div>
            )}
            {clientError && (
              <p className="text-xs text-red-400">{clientError}</p>
            )}
            <div className="grid gap-4">
              <Button type="submit" className="mt-4 w-full">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Confirm"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </FieldGroup>
    </div>
  );
}
