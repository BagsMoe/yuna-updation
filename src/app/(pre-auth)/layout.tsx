'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SidebarPreAuth from "@/components/moleculs/Sidebar/SidebarPreAuth";
import LoadingOverlay from '@/components/atoms/Loader/LoadingOverlay';

export default function PreAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowContent(false);

    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 1000); // Delay 1 detik

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main className="flex justify-between items-center py-8 px-8 h-screen">
      {/* KONTEN UTAMA */}
      <div className="relative flex flex-col justify-between items-center w-1/2 h-full pr-8">
        {loading && <LoadingOverlay />}
        {showContent && children}
      </div>

      {/* SIDEBAR KANAN (tidak terkena efek loading) */}
      <SidebarPreAuth />
    </main>
  );
}
