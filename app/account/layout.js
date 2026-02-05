import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 md:grid md:grid-cols-[16rem_1fr] md:gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
}
