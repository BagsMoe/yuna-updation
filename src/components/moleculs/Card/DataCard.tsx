'use client';

import { dummyUser } from '@/data/dummyUser';

export const UserInfoCard = () => {
  return (
    <div className="bg-white rounded-lg w-full space-y-6">
         <h1 className='text-xl font-medium'>Pengaturan Akun</h1>
      <div className="space-y-6 pb-10 text-sm text-gray-700">
        <div className="flex gap-5">
          <span className="w-[64px]">Nama</span>
          <span>:</span>
          <span className="flex-1">{dummyUser.name}</span>
        </div>
        <div className="flex gap-5">
          <span className="w-[64px]">NPK</span>
          <span >:</span>
          <span className="flex-1">{dummyUser.npk}</span>
        </div>
        <div className="flex gap-5">
          <span className="w-[64px]">Email</span>
          <span >:</span>
          <span className="flex-1">{dummyUser.email}</span>
        </div>
        <div className="flex gap-5">
          <span className="w-[64px]">Status</span>
          <span >:</span>
          <span className="flex-1">{dummyUser.role}</span>
        </div>
      </div>
    </div>
  );
};
