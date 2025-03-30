import ManagerSidebar from "@/components/ManagerSidebar";
import { Toaster } from "react-hot-toast";

export default function ManagerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z-80 bg-zinc-900">
        <ManagerSidebar />
      </div>
      <Toaster />
      <main className="md:pl-80 pb-10">
        <div className="py-4">{children}</div>
      </main>
    </div>
  );
}
