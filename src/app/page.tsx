import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Home() {
  const user = await auth();
  if (!user) redirect("/api/auth/signin");
  return (
    <div className="flex justify-center items-center h-screen">
      {JSON.stringify(user.user?.id)}
      <Link href="/no">Signout</Link>
    </div>
  );
}
