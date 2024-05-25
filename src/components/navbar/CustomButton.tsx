"use client";
import { authConfig } from "@/auth";
import { Button } from "../ui/button";
import { LogIn, LogOut, LogOutIcon } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

const CustomButton = ({ fun }: { fun: "IN" | "OUT" }) => {
  return fun === "IN" ? (
    <Button
      variant="outline"
      size="icon"
      type="submit"
      onClick={async () =>
        await signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
      className="rounded-full "
    >
      <LogOutIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    </Button>
  ) : (
    <Button
      variant="outline"
      size="icon"
      type="submit"
      className="rounded-full"
      onClick={async () =>
        await signIn(
          "github",
          {
            callbackUrl: "/dashboard",
            redirect: true,
          },
          authConfig
        )
      }
    >
      <LogIn className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    </Button>
  );
};

export default CustomButton;
