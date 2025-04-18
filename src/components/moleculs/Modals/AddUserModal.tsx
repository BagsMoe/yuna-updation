"use client"; // Menandakan bahwa komponen ini harus dirender di sisi client (Next.js App Router)

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Komponen dialog dari UI library
import { Input } from "@/components/ui/input"; // Input teks standar
import { Button } from "@/components/ui/button"; // Tombol standar
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Komponen dropdown/select
import dummyUsers from "@/data/dummyUsers.json"; // Data dummy pengguna
import { ScrollArea } from "@/components/ui/scroll-area"; // Scroll area untuk dropdown
import { SearchInput } from "@/components/atoms/Form/SearchInput"; // Input pencarian
import { NotificationModal } from "./NotificationModal"; // Modal notifikasi sukses/gagal

// Tipe data untuk opsi pengguna
interface UserOption {
  name: string;
  npk: string;
  email: string;
}

// Props yang diterima oleh AddUserModal
interface AddUserModalProps {
  open: boolean; // Status buka/tutup modal
  onClose: () => void; // Fungsi saat modal ditutup
  onUserAdded: () => void; // Callback saat user berhasil ditambahkan
}

const AddUserModal = ({ open, onClose, onUserAdded }: AddUserModalProps) => {
  // State internal form
  const [search, setSearch] = useState(""); // Untuk pencarian user
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null); // Pengguna yang dipilih
  const [email, setEmail] = useState(""); // Email pengguna
  const [role, setRole] = useState(""); // Role pengguna
  const [isModalOpen, setIsModalOpen] = useState(false); // Status modal notifikasi
  const [isSuccess, setIsSuccess] = useState(false); // Status sukses atau gagal

  // Fungsi untuk mereset form
  const resetForm = () => {
    setSelectedUser(null);
    setEmail("");
    setRole("");
    setSearch("");
  };

  // Filter user berdasarkan pencarian
  const filteredUsers = dummyUsers.filter((user) =>
    `${user.npk} - ${user.name}`.toLowerCase().includes(search.toLowerCase())
  );

  // Fungsi saat tombol Tambah ditekan
  const handleSubmit = () => {
    if (selectedUser && email && role) {
      const newUser = {
        name: selectedUser.name,
        npk: selectedUser.npk,
        email: `${email}@acc.co.id`,
        role,
      };

      // Ambil data user dari localStorage lalu tambahkan user baru
      const stored = localStorage.getItem("users");
      const users = stored ? JSON.parse(stored) : [];
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      // Tampilkan modal notifikasi sukses
      setIsSuccess(true);
      setIsModalOpen(true);
      onUserAdded(); // Panggil callback ke parent
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm(); // Reset form saat modal ditutup
          onClose();
        }
      }}
    >
      <DialogContent className="w-[500px] px-8 py-6">
        <DialogHeader>
          <DialogTitle>Tambah Pengguna</DialogTitle>
        </DialogHeader>

        {/* Form input */}
        <div className="space-y-4">
          {/* Dropdown pencarian nama/npk */}
          <div>
            <label className="block mb-1">Nama</label>
            <Select
              onValueChange={(npk) => {
                const user = dummyUsers.find((u) => u.npk === npk);
                if (user) {
                  setSelectedUser(user);
                  setEmail(user.email || "");
                }
              }}
              value={selectedUser?.npk || ""}
            >
              <SelectTrigger
                className={`w-full ${
                  selectedUser ? "border-[#222222]" : "border-[#D5D5D5]"
                }`}
              >
                <SelectValue placeholder="Input Karyawan" />
              </SelectTrigger>

              <SelectContent>
                <div className="p-2">
                  {/* Input pencarian */}
                  <SearchInput
                    placeholder="Cari NPK atau nama"
                    value={search}
                    onChange={setSearch}
                  />

                  {/* Daftar user yang bisa dipilih */}
                  <ScrollArea className="h-48 mt-2">
                    {filteredUsers.map((user) => (
                      <SelectItem key={user.npk} value={user.npk}>
                        {user.npk} - {user.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </div>
              </SelectContent>
            </Select>
          </div>

          {/* Input email dan role */}
          <div className="w-full flex gap-4">
            {/* Email */}
            <div className="w-full">
              <label className="mb-1">Email</label>
              <Input
                type="text"
                placeholder="email@acc.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!selectedUser} // Jika user dipilih, input email disable
                className={`border-[#D5D5D5] ${
                  email ? "bg-[#EFEFEF]" : "bg-white"
                }`}
              />
            </div>

            {/* Role */}
            <div className="w-full">
              <label className="mb-1">Role</label>
              <Select onValueChange={setRole} value={role}>
                <SelectTrigger
                  className={`w-full ${
                    role ? "border-[#222222]" : "border-[#D5D5D5]"
                  }`}
                >
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

          {/* Tombol Tambah */}
          <Button
            disabled={!(selectedUser && email && role)} // Disable jika belum lengkap
            onClick={handleSubmit}
            className={`w-full text-white ${
              selectedUser && email && role
                ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Tambah
          </Button>
        </div>
      </DialogContent>

      {/* Modal notifikasi sukses */}
      <NotificationModal
        isOpen={isModalOpen}
        imageSrc={isSuccess ? "/HighFive.png" : "/Thumbs_Down.png"}
        title={
          isSuccess
            ? "Pengguna berhasil ditambahkan"
            : " "
        }
        message={
          isSuccess
            ? "Password akses telah dikirimkan ke email pengguna. Selamat mengakses!"
            : " "
        }
        buttonText="Oke"
        onConfirm={() => {
          setIsModalOpen(false);
          resetForm();
          onClose();
        }}
      />
    </Dialog>
  );
};

export default AddUserModal;
