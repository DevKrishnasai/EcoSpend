import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await auth();
  if (!user) redirect("/api/auth/signin");
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Landing Page</h1>
      {JSON.stringify(user.user?.id)}
    </div>
  );
}
