'use client';

import { useState, useEffect } from 'react';

// Tipe data user sesuai struktur yang disimpan di localStorage
type User = {
  name: string;
  npk: string;
  email: string;
  role: string;
};

// Komponen untuk menampilkan informasi akun pengguna
export const UserInfoCard = () => {
  const [user, setUser] = useState<User | null>(null); // State untuk menyimpan data user

  // Ambil data user dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const userData = localStorage.getItem('userData'); // Ambil data user yang disimpan setelah login

    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData); // Parse data dari string JSON ke objek
        setUser(parsedUser); // Simpan ke state
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null); // Set null jika parsing gagal
      }
    }
  }, []);

  // Tampilan loading saat data user belum tersedia
  if (!user) {
    return (
      <div className="bg-white w-full space-y-6 border-b border-[#EFEFEF] p-4">
        <h1 className='text-xl font-medium'>Pengaturan Akun</h1>
        <div className="text-gray-500">Memuat data pengguna...</div>
      </div>
    );
  }

  // Tampilan utama saat data user berhasil dimuat
  return (
    <div className="bg-white w-full space-y-6 border-b border-[#EFEFEF] p-4">
      <h1 className='text-xl font-medium'>Pengaturan Akun</h1>

      {/* Informasi user ditampilkan dalam format label dan value */}
      <div className="space-y-6 pb-10 text-sm text-gray-700">
        <div className="flex gap-5">
          <span className="w-[64px]">Nama</span>
          <span>:</span>
          <span className="flex-1">{user?.name || '-'}</span>
        </div>

        <div className="flex gap-5">
          <span className="w-[64px]">NPK</span>
          <span>:</span>
          <span className="flex-1">{user?.npk || '-'}</span>
        </div>

        <div className="flex gap-5">
          <span className="w-[64px]">Email</span>
          <span>:</span>
          <span className="flex-1">{user?.email || '-'}</span>
        </div>

        <div className="flex gap-5">
          <span className="w-[64px]">Status</span>
          <span>:</span>
          <span className="flex-1">{user?.role || '-'}</span>
        </div>
      </div>
    </div>
  );
};
