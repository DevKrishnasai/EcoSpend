"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo, items } from "./Navbar";
import NavItems from "./NavItems";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <Logo />
        <div className="flex flex-col gap-3 mt-4">
          {items.map((item) => {
            const isActive = path === item.link;
            return (
              <div
                key={item.label}
                className={cn("p-2", isActive && "bg-secondary rounded-sm")}
                onClick={() => setOpen((p) => !p)}
              >
                <NavItems href={item.link} label={item.label} />
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
