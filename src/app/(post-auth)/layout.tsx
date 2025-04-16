"use client";

import SidebarPostAuth from "@/components/moleculs/Sidebar/SidebarPostAuth";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingOverlay from "@/components/atoms/Loader/LoadingOverlay";
import { PostAuthHeader } from "@/components/moleculs/Header/PostAuthHeader";

export default function PostAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <main className="flex h-screen w-screen pr-8 bg-[#F5F5F5]">
      {/* Sidebar */}
      <SidebarPostAuth />

      {/* Kontainer kanan */}
      <div className="flex-1 relative h-full rounded-3xl flex flex-col">
        {/* Header tetap di atas dan tidak terpengaruh loading */}
        <PostAuthHeader />

        {/* Konten dengan padding-top agar tidak ketutup header */}
        <div className="flex-1 overflow-y-auto bg-white pr-8 rounded-3xl relative">
          {loading && <LoadingOverlay />}
          {children}
        </div>
      </div>
    </main>
  );
}
