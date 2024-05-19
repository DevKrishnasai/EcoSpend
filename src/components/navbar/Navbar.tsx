import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import NavItems from "./NavItems";
import { LayoutDashboard, PiggyBankIcon, Settings } from "lucide-react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";

import CustomButton from "./CustomButton";
import NavbarPart from "./NavbarPart";
import { auth } from "@/auth";
import MobileNavBar from "./MobileNavBar";
import { ScrollArea } from "../ui/scroll-area";

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

// const DesktopView = () => {
//   return (
//     <div className="hidden md:flex md:justify-center  h-full border border-b-red-600 ">
//       <nav className="h-[50px] w-11/12 flex justify-between items-center ">
//         <Logo />
//         <div className="flex gap-6">
//           {items.map((item) => (
//             <NavItems key={item.label} href={item.link} label={item.label} />
//           ))}
//         </div>
//         <div className="flex gap-x-3">
//           <ThemeSwitcher />
//           <ProfileIcon />
//         </div>
//       </nav>
//     </div>
//   );
// };

// const MobileView = () => {
//   return (
//     <nav className="md:hidden h-[50px] mx-[10px] w-full flex justify-between items-center">
//       <div className="flex gap-3">
//         <Sidebar />
//         <Logo />
//       </div>
//       <div className="flex gap-3 ">
//         <ThemeSwitcher />
//         <ProfileIcon />
//       </div>
//     </nav>
//   );
// };

const Navbar = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <PiggyBankIcon className="h-6 w-6" />
              <span className="">Budget Tracker</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {items.map((item) => (
                <NavItems
                  key={item.label}
                  cls="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  {...item}
                />
              ))}
            </nav>
          </div>
          <div className=" flex justify-evenly mb-5">
            <CustomButton />

            <ThemeSwitcher />
            <Link href="/manage">
              <Button variant="outline" size="icon" className="shrink-0">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        <header className="flex h-[75px] items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[70px]">
          <MobileNavBar items={items} />

          <NavbarPart user={session?.user} />
        </header>
        <ScrollArea>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  ">
            {children}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Navbar;
