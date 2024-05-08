"use client";
import { cn } from "@/lib/utils";
import { TNavItem } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ label, href }: TNavItem) => {
  const path = usePathname();
  return (
    <Link href={href} className={cn(path === href && "font-bold")}>
      {label}
    </Link>
  );
};

export default NavItems;
