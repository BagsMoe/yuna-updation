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
    <main className="flex h-screen w-screen">
      {/* Sidebar */}
      <SidebarPostAuth />

      {/* Kontainer kanan */}
      <div className="flex-1 relative h-full flex flex-col">
        {/* Header tetap di atas dan tidak terpengaruh loading */}
        <PostAuthHeader />

        {/* Konten dengan padding-top agar tidak ketutup header */}
        <div className="flex-1 overflow-y-auto px-6 relative">
          {loading && <LoadingOverlay />}
          {children}
        </div>
      </div>
    </main>
  );
}
