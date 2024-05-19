import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";

const CustomButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <Button variant="outline" size="icon" type="submit">
        <LogOut className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default CustomButton;
