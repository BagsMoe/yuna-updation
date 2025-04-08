import SidebarLogin from "@/components/moleculs/Sidebar-login";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yuna Updation - Login",
  description: "Login to Yuna Updation",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <SidebarProvider className="max-h-1/2">
        {children}
        <SidebarLogin />
      </SidebarProvider>
    </main>
  );
}
