"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, PiggyBankIcon, Settings, LogOut as LG } from "lucide-react";
import Link from "next/link";
import NavItems from "./NavItems";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";
import { Logout } from "@/lib/action";

const MobileNavBar = ({
  items,
}: {
  items: {
    label: string;
    link: string;
    icon: JSX.Element;
  }[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
            <span className="text-2xl">Budget Tracker</span>
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
  );
};

export default MobileNavBar;
