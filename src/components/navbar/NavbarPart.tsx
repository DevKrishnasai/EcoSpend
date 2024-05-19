"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { redirect, usePathname } from "next/navigation";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Logout, Redirect } from "@/lib/action";

const NavbarPart = ({ user }: { user: User | undefined }) => {
  const path = usePathname();
  return (
    <>
      <p className="text-lg font-bold ">
        {path.includes("dashboard")
          ? "Dashboard"
          : path.includes("transactions")
          ? "Transactions"
          : path.includes("manage")
          ? "Manage"
          : "Dashboard"}
      </p>
      <div className="flex gap-2 lg:g-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar className="border">
                <AvatarImage
                  src={user?.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => await Redirect("/manage")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await Redirect("/support")}>
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => await Logout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default NavbarPart;
