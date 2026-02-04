import { auth } from "../_lib/auth";
import NavMenu from "@/app/_components/NavMenu";

export default async function Navigation() {
  const session = await auth();
  return <NavMenu user={session?.user ?? null} />;
}
