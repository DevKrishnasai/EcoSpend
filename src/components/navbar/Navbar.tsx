import { auth } from "@/auth";
import CustomNavbar from "./CustomNavbar";

const Navbar = async () => {
  const session = await auth();
  return <CustomNavbar user={session?.user} />;
};

export default Navbar;
