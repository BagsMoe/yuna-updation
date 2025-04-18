"use client"; // Komponen ini dijalankan di sisi client (bukan server), penting untuk event handler dan state

import React, { useEffect, useState } from "react";

// Komponen UI dari library internal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "@phosphor-icons/react"; // Icon trash untuk tombol hapus

// Tipe data untuk objek user
interface UserOption {
  name: string;
  npk: string;
  email: string;
  role: string;
}

// Props yang dikirim ke komponen EditUserModal
interface EditUserModalProps {
  open: boolean; // Menentukan apakah modal terbuka atau tidak
  onClose: () => void; // Fungsi untuk menutup modal
  user: UserOption; // Data user yang sedang diedit
  onEditClick: (updatedUser: UserOption) => void; // Fungsi saat klik tombol "Ubah"
  onDeleteClick: (user: UserOption) => void; // Fungsi saat klik ikon hapus
  loading?: boolean; // Optional: Menunjukkan apakah sedang loading
}

const EditUserModal = ({
  open,
  onClose,
  user,
  onEditClick,
  onDeleteClick,
  loading,
}: EditUserModalProps) => {
  const [email, setEmail] = useState(""); // Email tanpa domain @acc.co.id
  const [role, setRole] = useState(""); // Role user yang bisa diubah
  const [initialRole, setInitialRole] = useState(""); // Role awal untuk validasi apakah berubah

  // Saat `user` berubah (misalnya user baru dipilih), update nilai email dan role
  useEffect(() => {
    if (user) {
      setEmail(user.email.replace("@acc.co.id", "")); // Ambil hanya bagian awal email
      setRole(user.role); // Set role saat ini
      setInitialRole(user.role); // Simpan role awal untuk perbandingan saat klik "Ubah"
    }
  }, [user]);

  // Handle klik tombol "Ubah"
  const handleEdit = () => {
    onEditClick({
      ...user,
      email: `${email}@acc.co.id`, // Gabungkan kembali domain email
      role,
    });
  };

  // Handle klik ikon hapus
  const handleDelete = () => {
    onDeleteClick(user);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose(); // Jika modal ditutup, panggil fungsi onClose
      }}
    >
      <DialogContent
        className="w-[500px] px-8 py-6"
        style={{ cursor: loading ? "progress" : "default" }} // Ubah cursor saat loading
      >
        <DialogHeader>
          <DialogTitle>Edit Pengguna</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nama Karyawan (readonly) */}
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

          {/* Email dan Role */}
          <div className="w-full flex gap-4">
            {/* Email (readonly) */}
            <div className="w-full">
              <label className="mb-1">Email</label>
              <Input
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#D5D5D5] bg-[#EFEFEF]"
              />
            </div>

            {/* Role (editable) */}
            <div className="w-full">
              <label className="mb-1">Role</label>
              <Select
                onValueChange={setRole}
                value={role}
                disabled={loading} // Disable saat loading
              >
                <SelectTrigger
                  className="w-full shadow-none border-[#222222]"
                  style={{ cursor: loading ? "progress" : "pointer" }}
                >
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>

                <SelectContent className="shadow-none ">
                  <SelectItem className="cursor-pointer" value="Super Admin">
                    Super Admin
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="Admin">
                    Admin
                  </SelectItem>
                  <SelectItem className="cursor-pointer" value="User">
                    User
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tombol Aksi: Ubah & Hapus */}
          <div className="flex justify-start items-center gap-4">
            {/* Tombol "Ubah" */}
            <Button
              disabled={role === initialRole || loading} // Disable jika role belum diubah atau sedang loading
              style={{
                cursor: loading
                  ? "progress"
                  : role !== initialRole
                  ? "pointer"
                  : "not-allowed",
              }}
              onClick={handleEdit}
              className={`w-[386px] h-10 text-white cursor-pointer ${
                role !== initialRole
                  ? "bg-blue-500 hover:bg-blue-600" // Aktif saat role berubah
                  : "bg-gray-300 cursor-not-allowed" // Nonaktif jika tidak berubah
              }`}
            >
              {loading ? "Memproses..." : "Ubah"}
            </Button>

            {/* Ikon Hapus */}
            <span
              onClick={!loading ? handleDelete : undefined} // Jangan bisa klik saat loading
              style={{ cursor: loading ? "progress" : "pointer" }}
            >
              <Trash
                weight="fill"
                className={`${
                  loading ? "text-gray-400" : "text-red-500 hover:text-red-600"
                }`}
              />
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
