'use client'; // Menandakan komponen ini dirender di client-side (Next.js)

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Komponen modal dialog dari UI library
import { Input } from "@/components/ui/input"; // Komponen input kustom
import { Button } from "@/components/ui/button"; // Komponen button kustom
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Komponen select/dropdown
import { Trash } from "@phosphor-icons/react"; // Icon trash dari phosphor-icons

// Tipe data untuk pengguna
interface UserOption {
  name: string;
  npk: string;
  email: string;
  role: string;
}

// Props yang dikirim ke komponen EditUserModal
interface EditUserModalProps {
  open: boolean; // Status terbuka/tidaknya modal
  onClose: () => void; // Fungsi untuk menutup modal
  user: UserOption; // Data user yang akan diedit
  onEditClick: (updatedUser: UserOption) => void; // Fungsi untuk menyimpan perubahan user
  onDeleteClick: (user: UserOption) => void; // Fungsi untuk menghapus user
}

const EditUserModal = ({
  open,
  onClose,
  user,
  onEditClick,
  onDeleteClick,
}: EditUserModalProps) => {
  const [email, setEmail] = useState(""); // State untuk menyimpan email tanpa domain
  const [role, setRole] = useState(""); // State untuk role baru
  const [initialRole, setInitialRole] = useState(""); // State untuk role awal sebelum diedit

  // Saat modal dibuka (user berubah), set nilai awal email & role
  useEffect(() => {
    if (user) {
      setEmail(user.email.replace("@acc.co.id", "")); // Hanya tampilkan bagian awal email
      setRole(user.role); // Set role sekarang
      setInitialRole(user.role); // Simpan role awal
    }
  }, [user]);

  // Fungsi untuk meng-handle tombol "Ubah"
  const handleEdit = () => {
    onEditClick({
      ...user,
      email: `${email}@acc.co.id`, // Tambah kembali domain email
      role,
    });
  };

  // Fungsi untuk menghapus user
  const handleDelete = () => {
    onDeleteClick(user);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose(); // Tutup modal jika dialog ditutup
      }}
    >
      <DialogContent className="w-[500px] px-8 py-6">
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropdown nama karyawan (non-editable) */}
          <div>
            <label className="block mb-1">Nama</label>
            <Select disabled value={user.npk}>
              <SelectTrigger className="w-full border-[#D5D5D5] bg-[#EFEFEF]">
                <SelectValue placeholder="Input Karyawan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={user.npk}>
                  {user.npk} - {user.name}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input email dan dropdown role */}
          <div className="w-full flex gap-4">
            {/* Email (non-editable) */}
            <div className="w-full">
              <label className="mb-1">Email</label>
              <Input
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#D5D5D5] bg-[#EFEFEF]"
              />
            </div>
            {/* Role (bisa diganti) */}
            <div className="w-full">
              <label className="mb-1">Role</label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger className="w-full shadow-none border-[#222222]">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tombol Ubah & Hapus */}
          <div className="flex justify-start items-center gap-4">
            <Button
              disabled={role === initialRole} // Hanya aktif jika role berubah
              onClick={handleEdit}
              className={`w-[386px] h-10 text-white ${
                role !== initialRole
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Ubah
            </Button>

            {/* Tombol icon hapus */}
            <span
              onClick={handleDelete}
              className="w-10 h-10 border border-red-600 rounded-lg p-3 cursor-pointer"
            >
              <Trash weight="fill" className="text-red-500 hover:text-red-600" />
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
