import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LOGIN } from "@/utils/constants";

const ProfileIcon = async () => {
  const session = await auth();
  if (!session?.user) redirect(LOGIN);
  const user = session.user;
  return (
    <Avatar className="border -z-20">
      <AvatarImage src={user.image || "https://github.com/shadcn.png"} />
      {/* <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback> */}
    </Avatar>
  );
};

export default ProfileIcon;
