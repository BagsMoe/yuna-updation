'use client'; // Menandakan bahwa komponen ini dijalankan di sisi klien (client-side)

// Import ikon dari phosphor-react
import { FinnTheHuman, CaretDown } from 'phosphor-react';
// Import data dummy user
import { dummyUser } from '@/data/dummyUser';
// Import hook untuk mendapatkan path halaman saat ini
import { usePathname } from 'next/navigation';

import Link from 'next/link';

// Fungsi untuk mengambil dua kata pertama dari nama lengkap
const getFirstTwoNames = (fullName: string) => {
  return fullName.split(' ').slice(0, 2).join(' '); // Split berdasarkan spasi, ambil dua kata pertama, lalu gabung lagi
};

export const PostAuthHeader = () => {
  const userName = getFirstTwoNames(dummyUser.name); // Ambil nama pendek dari dummyUser
  const pathname = usePathname(); // Dapatkan path URL saat ini

  const showSettingsButton = pathname === '/homepage'; // Tampilkan tombol pengaturan hanya di halaman homepage

  return (
    <header className="relative h-[80px] w-full flex items-center justify-between px-6 bg-[#F5F5F5]">
      {/* Salam selamat datang dan nama user */}
      <h1 className="text-lg font-semibold text-gray-800">
        Selamat Datang, {userName}!
      </h1>

      {/* Bagian kanan: ikon dan nama user */}
      <div className="flex items-center gap-2">
        {/* Lingkaran putih dengan ikon Finn */}
        <div className='w-8 h-8 bg-white rounded-full flex items-center justify-center'>
          <FinnTheHuman size={18} weight='fill' />
        </div>
        {/* Nama user */}
        <span className="text-sm font-medium">{userName}</span>
        {/* Ikon panah bawah */}
        <CaretDown size={16} />
      </div>

      {/* Jika sedang di halaman homepage, tampilkan tombol pengaturan akun */}
      {showSettingsButton && (
        <div className="absolute z-999 right-6 top-[60px] p-[10px] bg-white border rounded-s-sm">
          <Link
            href="/pengaturan-akun"
            className="bg-blue-600 text-white text-sm font-medium w-[160px] h-[36px] px-4 py-2 rounded gap-[10px] shadow cursor-pointer"
          >
            Pengaturan Akun
          </Link>
        </div>
      )}
    </header>
  );
};
