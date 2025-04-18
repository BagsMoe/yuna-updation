'use client'; // Menandakan file ini menggunakan fitur client-side rendering dari Next.js

import { useState, useEffect, useRef } from 'react';
import { FinnTheHuman, CaretDown, CaretUp } from 'phosphor-react'; // Icon dari pustaka phosphor-react
import { UserDropdown } from '@/components/atoms/Dropdown/UserDropdown'; // Komponen dropdown user

// Fungsi untuk mengambil maksimal dua kata pertama dari nama lengkap
const getFirstTwoNames = (fullName: string) => {
  return fullName.split(' ').slice(0, 2).join(' ');
};

export const PostAuthHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State untuk toggle visibilitas dropdown
  const [userName, setUserName] = useState(''); // State untuk menyimpan nama user yang ditampilkan
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref untuk mendeteksi klik di luar dropdown

  // Ambil data user dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(getFirstTwoNames(user.name)); // Simpan dua kata pertama dari nama user
    }
  }, []);

  // Handle klik di luar dropdown agar bisa menutup dropdown secara otomatis
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false); // Tutup dropdown jika klik di luar area
      }
    };

    // Tambah atau hapus event listener tergantung apakah dropdown sedang terbuka
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener saat komponen unmount atau showDropdown berubah
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Fungsi untuk toggle dropdown saat button diklik
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <header className="relative h-[80px] w-full flex items-center justify-between pr-8 bg-[#F5F5F5]">
      {/* Teks selamat datang dengan nama user */}
      <h1 className="text-[28px] font-medium text-gray-800">
        Selamat Datang, {userName}!
      </h1>

      {/* Area avatar dan nama user yang bisa diklik untuk membuka dropdown */}
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        {/* Avatar dengan icon */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <FinnTheHuman size={18} weight="fill" />
        </div>

        {/* Nama user */}
        <span className="text-sm font-medium">{userName}</span>

        {/* Tombol untuk membuka atau menutup dropdown */}
        <button className="cursor-pointer" onClick={toggleDropdown}>
          {showDropdown ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </button>
      </div>

      {/* Komponen dropdown user */}
      <UserDropdown
        visible={showDropdown}
        onCloseDropdown={() => setShowDropdown(false)}
      />
    </header>
  );
};
