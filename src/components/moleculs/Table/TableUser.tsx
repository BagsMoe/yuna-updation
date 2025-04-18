'use client';

import { useState } from "react";
import EditUserModal from "../Modals/EditUserModal";

// Definisi tipe user
interface User {
  name: string;
  npk: string;
  role: string;
  email: string;
}

// Komponen TabelUser menerima props users dan onUserEdited
export default function TabelUser({
  users,
  onUserEdited,
}: {
  users: User[];
  onUserEdited: () => void; // Fungsi callback untuk reload data dari parent
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Untuk kontrol modal edit
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // User yang akan diedit

  // Fungsi yang dijalankan saat baris diklik
  const handleRowClick = (user: User) => {
    setSelectedUser(user);     // Simpan user yang dipilih
    setIsModalOpen(true);      // Tampilkan modal edit
  };

  return (
    <>
      {/* Tabel User */}
      <table className="w-full text-sm text-left mt-4">
        <thead className="text-gray-700">
          <tr className="flex justify-start items-center gap-4">
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">Nama</th>
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">NPK</th>
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">Role</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping data user ke dalam baris tabel */}
          {users.map((user, idx) => {
            const firstTwoWords = user.name.split(" ").slice(0, 2).join(" ");
            return (
              <tr
                key={idx}
                className="hover:bg-gray-50 flex justify-start items-center gap-4 border-b w-[938px] cursor-pointer"
                onClick={() => handleRowClick(user)} // Saat baris diklik, buka modal edit
              >
                <td className="w-[300px] py-2 px-4">{firstTwoWords}</td>
                <td className="w-[300px] py-2 px-4">{user.npk}</td>
                <td className="w-[300px] py-2 px-4">{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Edit User */}
      {selectedUser && (
        <EditUserModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUserEdited={() => {
          setIsModalOpen(false);
          onUserEdited(); // ini penting untuk reload data di parent
        }}
        user={selectedUser}
      />
      )}
    </>
  );
}
