import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z-80 bg-zinc-900">
        <Sidebar />
      </div>
      <Toaster />
      <main className="md:pl-80">
        <div className="">{children}</div>
      </main>
    </div>
  );
}
