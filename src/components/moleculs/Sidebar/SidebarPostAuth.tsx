'use client'

// Import komponen dan ikon yang diperlukan
import Image from "next/image";
import { HouseLine, UserGear, Rows, Wrench, SignOut } from '@phosphor-icons/react';
import Link from "next/link";
import { usePathname , useRouter } from "next/navigation"; // Hook untuk mengetahui path URL saat ini
import { Button } from "@/components/ui/button";
import { useState  } from "react";
// import { SignOutCard } from "@/components/moleculs/Modals/SignOutModal";
import { ConfirmModal } from "@/components/moleculs/Modals/ConfirmModal";

export default function SidebarPostAuth() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    // 1. Hapus data userData dan rememberMe dari localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    
    // 2. Redirect ke halaman masuk
    router.push('/masuk');
    
    // 3. Tutup modal
    setShowSignOutModal(false);
  };

  const handleCancelSignOut = () => {
    // Hanya tutup modal tanpa aksi lain
    setShowSignOutModal(false);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="flex flex-col justify-between items-center w-[280px] border-none h-full py-[58px] px-6 bg-[#F5F5F5]">
        <div className="flex flex-col justify-between w-full h-full">

          {/* Bagian atas sidebar: logo dan menu navigasi */}
          <div className="space-y-[49px]  w-[232px] h-[225px]">
            <Image
              src="/sidebarlogo.png"
              alt="Logo"
              width={191}
              height={32}
              className="object-cover rounded-xl"
              priority={true}
            />

            {/* Navigasi utama */}
            <div className="flex flex-col w-full">
              {/* Link ke Halaman Utama */}
              <Link
                href="/homepage"
                className={`flex gap-1.5 justify-start items-center w-[232px] h-12 rounded-[8px] px-[14px] py-[28px] transition-colors text-sm ${
                  pathname === "/homepage"
                    ? "bg-[#165FF0] text-white" // Aktif
                    : "bg-transparent text-[#222222] hover:bg-[#165FF0] hover:text-white active:bg-[#165FF0]" // Non-aktif
                }`}
              >
                <HouseLine size={18} weight="fill" /> Halaman Utama
              </Link>

              {/* Link ke Daftar Nomor */}
              <Link
                href="/daftar-nomor"
                className={`flex gap-1.5 justify-start items-center w-[232px] h-12 rounded-[8px] px-[14px] py-[28px] transition-colors text-sm ${
                  pathname === "/daftar-nomor"
                    ? "bg-[#165FF0] text-white"
                    : "bg-transparent text-[#222222] hover:bg-[#165FF0] hover:text-white active:bg-[#165FF0]"
                }`}
              >
                <Rows size={18} weight="fill" /> Daftar Nomor
              </Link>

              {/* Link ke Kelola Akses */}
              <Link
                href="/kelola-akses"
                className={`flex gap-1.5 justify-start items-center w-[232px] h-12 rounded-[8px] px-[14px] py-[28px] transition-colors text-sm ${
                  pathname === "/kelola-akses"
                    ? "bg-[#165FF0] text-white"
                    : "bg-transparent text-[#222222] hover:bg-[#165FF0] hover:text-white active:bg-[#165FF0]"
                }`}
              >
                <UserGear size={18} weight="fill" /> Kelola Akses
              </Link>
            </div>
          </div>

          {/* Bagian bawah sidebar: pengaturan dan tombol keluar */}
          <div className="flex flex-col w-[232px]"> 
            {/* Link ke Pengaturan Akun */}
            <Link
              href="/pengaturan-akun"
              className={`flex gap-1.5 justify-start items-center w-[232px] h-12 rounded-[8px] px-[14px] py-[28px] transition-colors text-sm
                  ? "bg-[#165FF0] text-white"
                  : "bg-transparent text-[#222222] hover:bg-[#165FF0] hover:text-white active:bg-[#165FF0]"
              }`}
            >
              <Wrench size={18} weight="fill" /> Pengaturan
            </Link>

            {/* Tombol keluar (membuka modal konfirmasi keluar) */}
            <Button
              onClick={handleSignOutClick } // ketika diklik, buka modal
              className="flex gap-1.5 justify-start items-center w-[232px] h-12 bg-transparent text-sm rounded-[8px] cursor-pointer transition-colors hover:bg-red-700 active:bg-red-700 px-[14px] py-[28px] text-[#222222] hover:text-white group"
            >
              <SignOut size={18} weight="fill" className="text-red-700 rotate-180 group-hover:text-white" /> Keluar
            </Button>
          </div>
        </div>
      </aside>

      {/* SignOut Modal */}
      <ConfirmModal
        isOpen={showSignOutModal}
        imageSrc="/WalkOut.png"
        title="Keluar dari Dashboard!"
        message="Anda akan keluar dari dashboard. Apakah Anda yakin?"
        buttonText="Batal"
        buttonText2="Ya, Keluar"
        onConfirm={handleConfirmSignOut}  // Handle konfirmasi
        onCancel={handleCancelSignOut}    // Handle pembatalan
        cancelButtonClass="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700"
        confirmButtonClass="bg-[#E15241] hover:bg-red-600 "
      />
    </>
  );
}
