import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import NavItems from "./NavItems";
import ProfileIcon from "./ProfileIcon";
import Sidebar from "./Sidebar";

const Navbar = () => {
  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
};

export const items = [
  { label: "Dashboard", link: "/dashboard" },
  { label: "Transactions", link: "/transactions" },
  { label: "Manage", link: "/manage" },
];

const DesktopView = () => {
  return (
    <div className="hidden md:flex md:justify-center  h-full border border-b-red-600 ">
      <nav className="h-[50px] w-11/12 flex justify-between items-center ">
        <Logo />
        <div className="flex gap-6">
          {items.map((item) => (
            <NavItems key={item.label} href={item.link} label={item.label} />
          ))}
        </div>
        <div className="flex gap-x-3">
          <ThemeSwitcher />
          <ProfileIcon />
        </div>
      </nav>
    </div>
  );
};

const MobileView = () => {
  return (
    <div className="md:hidden w-full ">
      <nav className="h-[50px] mx-[10px] flex justify-between items-center border-b-red-600">
        <div className="flex gap-3">
          <Sidebar />
          <Logo />
        </div>
        <div className="flex gap-3">
          <ThemeSwitcher />
          <ProfileIcon />
        </div>
      </nav>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link href="/dashboard" className="stroke-amber-500 font-bold text-xl">
      Budget Tracker
    </Link>
  );
};

export default Navbar;
