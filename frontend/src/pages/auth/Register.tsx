import { RegisterForm } from "@/components/auth/RegisterForm";
import { Icons } from "@/components/icons";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="flex min-h-screen place-items-center px-6">
      <Link
        to="#"
        className="text-foreground/80 hover:text-foreground fixed top-6 left-6 flex items-center text-lg font-bold tracking-tight transition-colors md:pt-10 lg:pt-4 lg:pl-4"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        Furniture Shop
      </Link>
      <RegisterForm className="mx-auto w-full max-w-sm" />
    </div>
  );
}
