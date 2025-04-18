"use client";

import React, { useState } from "react";
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
import dummyUsers from "@/data/dummyUsers.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "@/components/atoms/Form/SearchInput";
import { NotificationModal } from "./NotificationModal";

interface UserOption {
  name: string;
  npk: string;
  email: string;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

const AddUserModal = ({ open, onClose, onUserAdded }: AddUserModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setSelectedUser(null);
    setEmail("");
    setRole("");
    setSearch("");
  };

  const filteredUsers = dummyUsers.filter((user) =>
    `${user.npk} - ${user.name}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedUser && email && role) {
      const newUser = {
        name: selectedUser.name,
        npk: selectedUser.npk,
        email: `${email}@acc.co.id`,
        role,
      };
      const stored = localStorage.getItem("users");
      const users = stored ? JSON.parse(stored) : [];
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      setIsSuccess(true);
      setIsModalOpen(true);
      onUserAdded();
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
          onClose();
        }
      }}
    >
      <DialogContent className="w-[500px] px-8 py-6">
        <DialogHeader>
          <DialogTitle>Tambah Pengguna</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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
                  <SearchInput
                    placeholder="Cari NPK atau nama"
                    value={search}
                    onChange={setSearch}
                  />
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

          <div className="w-full flex gap-4">
            <div className="w-full">
              <label className="mb-1">Email</label>
              <Input
                type="text"
                placeholder="email@acc.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!!selectedUser}
                className={`border-[#D5D5D5] ${
                  email ? "bg-[#EFEFEF]" : "bg-white"
                }`}
              />
            </div>

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

          <Button
            disabled={!(selectedUser && email && role)}
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
