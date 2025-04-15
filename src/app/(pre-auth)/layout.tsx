// 'use client';
// // import SidebarLogin from "@/components/moleculs/Sidebar-login";
// // import { SidebarProvider } from "@/components/ui/sidebar";
// import SidebarLogin from "@/components/moleculs/Sidebar/SidebarLogin";
// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import LoadingOverlay from "@/components/atoms/Loader/LoaderOverlay";


// export default function PreAuthLayout(
//    { children,
//    }: {
//      children: React.ReactNode;
//    }) {
//      const pathname = usePathname();
//      const [loading, setLoading] = useState(false);
   
//      useEffect(() => {
//        setLoading(true);
//        const timeout = setTimeout(() => setLoading(false), 3000); // simulasi waktu loading
//        return () => clearTimeout(timeout);
//      }, [pathname]);
//   return (
//     // <main className="pr-8 px-8">
//     //   <SidebarProvider className="">
//     //     {children}
//     //     <SidebarLogin />
//     //   </SidebarProvider>
//     // </main>
//     <main className="flex justify-between items-center py-8 px-8 h-screen">
//       <div className="relative w-full h-full pr-8">
//         {loading && <LoadingOverlay />}
//         {children}
//       </div>
//         {/* {children} */}
//         <SidebarLogin />
      
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SidebarLogin from "@/components/moleculs/Sidebar/SidebarPreAuth";
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
    // Tampilkan loader dulu selama 1 detik
    setLoading(true);
    setShowContent(false);

    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 1000); // 1 detik delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <main className="flex justify-between items-center py-8 px-8 h-screen">
      {/* KONTEN KIRI */}
      <div className="relative flex flex-col justify-between items-center w-1/2 h-full pr-8">
        {loading && <LoadingOverlay />}
        {showContent && children}
      </div>

      {/* SIDEBAR KANAN - tidak ikut loading */}
      <SidebarLogin />
    </main>
  );
}
