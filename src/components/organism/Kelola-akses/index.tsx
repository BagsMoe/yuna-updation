'use client';

import { useEffect, useState } from "react";
import { SearchInput } from "@/components/atoms/Form/SearchInput";
import TabelUser from "@/components/moleculs/Table/TableUser";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddUserModal from "@/components/moleculs/Modals/AddUserModal";

// Definisi tipe data user
interface User {
  name: string;
  npk: string;
  role: string;
  email: string;
}

export default function KelolaAksesContent() {
  const [searchTerm, setSearchTerm] = useState(''); // Untuk menyimpan input pencarian
  const [open, setOpen] = useState(false); // Untuk kontrol modal tambah user
  const [users, setUsers] = useState<User[]>([]); // Data user yang ditampilkan di tabel

  // Fungsi untuk ambil data user dari localStorage
  const loadUsers = () => {
    const stored = localStorage.getItem('users');
    const data = stored ? JSON.parse(stored) : [];
    setUsers(data);
  };

  // Callback yang dipanggil setelah user ditambahkan atau diedit
  const handleUserUpdated = () => {
    loadUsers();     // Refresh ulang data user
    setOpen(false);  // Tutup modal tambah jika terbuka
  };

  // Jalankan saat pertama kali komponen di-render (initial load)
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter user berdasarkan input pencarian
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.npk.includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header dan tombol tambah pengguna */}
      <div className="flex gap-4 justify-start items-center mb-4">
        <h1 className="text-xl font-medium">Kelola Akses</h1>
        <Button
          onClick={() => setOpen(true)} // Buka modal tambah user
          className="text-xs text-gray-500 w-[158px] bg-transparent border ring-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg cursor-pointer flex items-center gap-2"
        >
          <Plus size={16} />
          Tambah Pengguna
        </Button>
        {/* Modal Tambah Pengguna */}
        <AddUserModal
          open={open}
          onClose={() => setOpen(false)}
          onUserAdded={handleUserUpdated} // Panggil handleUserUpdated saat user ditambahkan
        />
      </div>

      {/* Area tabel dan pencarian */}
      <div className="border border-gray-200 rounded-lg p-[18px] space-y-[18px]">
        <div className="w-60">
          {/* Input untuk pencarian user */}
          <SearchInput
            placeholder="Cari data"
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>

        {/* Tabel User */}
        <TabelUser
          users={filteredUsers}
          onUserEdited={handleUserUpdated} // Panggil handleUserUpdated saat user diedit
        />
      </div>
    </div>
  );
}
