import { LoginForm } from "@/components/auth/LoginForm";
import { Icons } from "@/components/icons";
import Banner from "@/data/images/house.webp";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-start gap-2 font-bold md:justify-start">
          <Link
            to="#"
            className="text-foreground/80 hover:text-foreground flex items-center gap-2 text-lg font-bold tracking-tight transition-colors"
          >
            <Icons.logo className="size-6" aria-hidden="true" />
            Furniture Shop
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src={Banner}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
