"use client";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { User } from "next-auth";
import NavbarPart from "./NavbarPart";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, PiggyBankIcon, LogOut as LG } from "lucide-react";
import NavItems from "./NavItems";
import { Logout } from "@/lib/action";

export const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Transactions",
    link: "/transactions",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  { label: "Manage", link: "/manage", icon: <Settings className="h-5 w-5" /> },
];

const CustomNavbar = ({ user }: { user: User | undefined }) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  console.log("path", path, user?.name);

  if (path === "/") return null;
  return (
    <div className="w-full my-2">
      <nav className="hidden mx-auto lg:w-11/12 md:flex justify-between items-center border rounded-full px-4 py-1 shadow-sm">
        <Link href="/" className="text-2xl font-bold flex items-center ">
          <PiggyBankIcon className="h-10 w-10 animate-bounce" />
          <span className="ml-3"> EcoSpend</span>
        </Link>
        <div className="flex items-center px-2 text-sm font-medium lg:px-4 py-2">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.link}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-1 text-lg transition-all font-semibold",
                path === item.link
                  ? "dark:text-black dark:bg-white bg-black text-white rounded-full"
                  : "text-black dark:text-white ",
                "hover:scale-105 ease-linear"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          {user && <CustomButton fun="IN" />}
          {!user && <CustomButton fun="OUT" />}
          <ThemeSwitcher />
          {user && <NavbarPart user={user} />}
        </div>
      </nav>
      <div className="md:hidden mx-2 flex justify-between items-center ">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col justify-between">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <PiggyBankIcon className="h-10 w-10" />
                <span className="text-2xl">EcoSpend</span>
              </Link>
              {items.map((item) => (
                <NavItems
                  key={item.label}
                  cls="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground  transition-all"
                  setOpen={setOpen}
                  {...item}
                />
              ))}
            </nav>
            <div className=" flex justify-evenly mb-5">
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={async () => await Logout()}
              >
                <LG className="h-5 w-5" />
              </Button>

              <ThemeSwitcher />
              <Link href="/manage">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-2xl font-bold">
          {path === "/dashboard" && "Dashboard"}
          {path === "/transactions" && "Transactions"}
          {path === "/manage" && "Manage"}
        </span>
        <NavbarPart user={user} />
      </div>
    </div>
  );
};

export default CustomNavbar;
