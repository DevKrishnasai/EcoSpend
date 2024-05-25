"use client";
import { SetStateAction, Dispatch } from "react";
import { cn } from "@/lib/utils";
import { TNavItem } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItems = ({
  label,
  link,
  cls,
  icon,
  setOpen = (value: SetStateAction<boolean>) => {},
}: TNavItem & { setOpen?: Dispatch<SetStateAction<boolean>> }) => {
  const path = usePathname();
  return (
    <Link
      href={link}
      className={cn(cls, path === link && "font-bold bg-muted")}
      onClick={() => setOpen(false)}
    >
      {icon}
      {label}
    </Link>
  );
};

export default NavItems;
