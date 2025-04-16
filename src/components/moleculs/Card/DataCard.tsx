'use client';

import { useState, useEffect } from 'react';

type User = {
  name: string;
  npk: string;
  email: string;
  role: string;
};

export const UserInfoCard = () => {
  // Perbaikan 1: Gunakan array destructuring untuk useState
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Ambil data user dari localStorage saat komponen dimount
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        // Parse data JSON dan pastikan tipenya sesuai
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Perbaikan 2: Handle error parsing
        setUser(null); // Reset state user jika ada error
      }
    }
  }, []); // Dependency array kosong = hanya dijalankan sekali saat mount

  // Perbaikan 3: Handle case ketika user belum terload atau null
  if (!user) {
    return (
      <div className="bg-white w-full space-y-6 border-b border-[#EFEFEF] p-4">
        <h1 className='text-xl font-medium'>Pengaturan Akun</h1>
        <div className="text-gray-500">Memuat data pengguna...</div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full space-y-6 border-b border-[#EFEFEF] p-4">
      <h1 className='text-xl font-medium'>Pengaturan Akun</h1>
      
      <div className="space-y-6 pb-10 text-sm text-gray-700">
        {/* Perbaikan 4: Gunakan optional chaining untuk safety */}
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