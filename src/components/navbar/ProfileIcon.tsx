import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProfileIcon = async () => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const user = session.user;
  return (
    <div>
      <Avatar className="border">
        <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfileIcon;
