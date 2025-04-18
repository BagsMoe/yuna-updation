'use client';

import { useState, useEffect, useRef } from 'react';
import { FinnTheHuman, CaretDown, CaretUp } from 'phosphor-react'; // Import ikon dari 'phosphor-react'
import { UserDropdown } from '@/components/atoms/Dropdown/UserDropdown'; // Import komponen dropdown pengguna

// Fungsi untuk mengambil maksimal dua kata pertama dari nama lengkap
const getFirstTwoNames = (fullName: string) => {
  return fullName.split(' ').slice(0, 2).join(' '); // Split nama berdasarkan spasi dan ambil dua kata pertama
};

export const PostAuthHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State untuk mengatur visibilitas dropdown
  const [userName, setUserName] = useState(''); // State untuk menyimpan nama pengguna
  const dropdownRef = useRef<HTMLDivElement>(null); // Referensi untuk elemen dropdown agar bisa mendeteksi klik di luar dropdown

  // Ambil data user dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const userData = localStorage.getItem('userData'); // Mengambil data user yang telah disimpan sebelumnya di localStorage
    if (userData) {
      const user = JSON.parse(userData); // Parsing data user dari string JSON menjadi objek
      setUserName(getFirstTwoNames(user.name)); // Ambil dua kata pertama dari nama dan set ke state userName
    }
  }, []); // Hook ini hanya dijalankan sekali saat komponen pertama kali dirender

  // Handle klik di luar dropdown untuk menutup dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika klik terjadi di luar elemen dropdown, set showDropdown ke false
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    // Menambahkan event listener untuk mendeteksi klik di luar dropdown
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener saat komponen unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]); // Efek ini dijalankan setiap kali state showDropdown berubah

  const toggleDropdown = () => setShowDropdown((prev) => !prev); // Toggle visibilitas dropdown saat tombol dropdown diklik

  return (
    <header className="relative h-[80px] w-full flex items-center justify-between pr-8 bg-[#F5F5F5]">
      {/* Menampilkan pesan selamat datang dengan nama pengguna */}
      <h1 className="text-[28px] font-medium text-gray-800">
        Selamat Datang, {userName}!
      </h1>

      {/* Bagian untuk menampilkan foto profil pengguna dan nama */}
      <div className="relative flex items-center gap-2" ref={dropdownRef}>
        {/* Foto profil, menggunakan icon FinnTheHuman */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <FinnTheHuman size={18} weight="fill" />
        </div>

        {/* Nama pengguna */}
        <span className="text-sm font-medium">{userName}</span>

        {/* Tombol untuk toggle dropdown */}
        <button className="cursor-pointer" onClick={toggleDropdown}>
          {/* Ikon dropdown yang berubah tergantung status showDropdown */}
          {showDropdown ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </button>
      </div>

      {/* Komponen dropdown yang hanya muncul ketika showDropdown true */}
      <UserDropdown
        visible={showDropdown}
        onCloseDropdown={() => setShowDropdown(false)} // Menutup dropdown saat dipanggil
      />
    </header>
  );
};
