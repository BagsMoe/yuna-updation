'use client';

import Link from 'next/link';

type UserDropdownProps = {
  visible: boolean;
};

export const UserDropdown = ({ visible }: UserDropdownProps) => {
  if (!visible) return null;

  return (
    <div className="absolute z-[999] right-8 top-[60px] p-[10px] bg-white border rounded-s-sm">
      <Link
        href="/pengaturan-akun"
        className="bg-blue-600 text-white text-sm font-medium w-[160px] h-[36px] px-4 py-2 rounded gap-[10px] shadow cursor-pointer flex items-center justify-center"
      >
        Pengaturan Akun
      </Link>
    </div>
  );
};
