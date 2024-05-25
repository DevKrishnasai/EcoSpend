"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PiggyBankIcon } from "lucide-react";
import NavItems from "./NavItems";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <PiggyBankIcon className="h-6 w-6" />
            <span className="">EcoSpend</span>
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          {items.map((item) => {
            const isActive = path === item.link;
            return (
              <div
                key={item.label}
                className={cn("p-2", isActive && "bg-secondary rounded-sm")}
                onClick={() => setOpen((p) => !p)}
              >
                <NavItems
                  icon={item.icon}
                  link={item.link}
                  label={item.label}
                />
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
