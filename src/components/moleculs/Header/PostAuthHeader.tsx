'use client';

import { useState, useEffect } from 'react';
import { FinnTheHuman, CaretDown, CaretUp } from 'phosphor-react';
import { UserDropdown } from '@/components/atoms/Dropdown/UserDropdown';

const getFirstTwoNames = (fullName: string) => {
  return fullName.split(' ').slice(0, 2).join(' ');
};

export const PostAuthHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState(''); // State untuk menyimpan nama user

  // Ambil data user dari localStorage saat komponen dimount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(getFirstTwoNames(user.name));
    }
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <header className="relative h-[80px] w-full flex items-center justify-between pr-8 bg-[#F5F5F5]">
      {/* Salam selamat datang dan nama user */}
      <h1 className="text-[28px] font-medium text-gray-800">
        Selamat Datang, {userName}!
      </h1>

      {/* Bagian kanan */}
      <div className="relative flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <FinnTheHuman size={18} weight="fill" />
        </div>
        <span className="text-sm font-medium">{userName}</span>

        {/* Caret toggle */}
        <button onClick={toggleDropdown}>
          {showDropdown ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </button>
      </div>

      {/* Dropdown di luar supaya bebas posisi */}
      <UserDropdown visible={showDropdown} />
    </header>
  );
};