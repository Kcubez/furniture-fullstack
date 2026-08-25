import * as React from "react";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className={cn(className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-1 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={props.value === "" || props.disabled}
      >
        {showPassword ? (
          <EyeNoneIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide Password" : "Show Password"}
        </span>
      </Button>
    </div>
  );
}

export { PasswordInput };
