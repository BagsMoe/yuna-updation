"use client";

import React, { useState, useEffect } from "react";
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
// import dummyUsers from "@/data/dummyUsers.json";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { SearchInput } from "@/components/atoms/Form/SearchInput";
import { NotificationModal } from "./NotificationModal";
import { Trash } from "@phosphor-icons/react";
import { ConfirmModal } from "@/components/moleculs/Modals/ConfirmModal";

interface UserOption {
  name: string;
  npk: string;
  email: string;
  role: string;
}

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserEdited: () => void;
  user: UserOption;
}

const EditUserModal = ({
  open,
  onClose,
  onUserEdited,
  user,
}: EditUserModalProps) => {
  const [selectedUser, setSelectedUser] = useState<UserOption | null>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  //   const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedUser({
        name: user.name,
        npk: user.npk,
        email: user.email,
        role: user.role,
      });
      setEmail(user.email.replace("@acc.co.id", ""));
      setRole(user.role);
    }
  }, [user]);

  const resetForm = () => {
    setSelectedUser(null);
    setEmail("");
    setRole("");
    // setSearch("");
  };

  //   const filteredUsers = dummyUsers.filter((user) =>
  //     `${user.npk} - ${user.name}`.toLowerCase().includes(search.toLowerCase())
  //   );

  const handleSubmit = () => {
    setShowEditConfirm(true); // tampilkan modal konfirmasi
  };

  const handleConfirmSubmit = () => {
    if (selectedUser && email && role) {
      const updatedUser = {
        name: selectedUser.name,
        npk: selectedUser.npk,
        email: `${email}@acc.co.id`,
        role,
      };

      const stored = localStorage.getItem("users");
      const users: UserOption[] = stored ? JSON.parse(stored) : [];

      const updatedUsers = users.map((u) =>
        u.npk === updatedUser.npk ? updatedUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setShowEditConfirm(false); // tutup confirm modal
      setIsSuccess(true); // trigger notif success
      setIsModalOpen(true); // tampilkan notifikasi modal
      onUserEdited(); // reload data
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    const stored = localStorage.getItem("users");
    const users: UserOption[] = stored ? JSON.parse(stored) : [];

    const filtered = users.filter((u) => u.npk !== selectedUser?.npk);
    localStorage.setItem("users", JSON.stringify(filtered));

    setIsSuccess(true);
    setIsModalOpen(true);
    setShowDeleteConfirm(false);
    onUserEdited();
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
          <DialogTitle>Edit Pengguna</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
        <div>
        <label className="block mb-1">Nama</label>
        <Select disabled value={selectedUser?.npk || ""}>
        <SelectTrigger className="w-full border-[#D5D5D5] bg-[#EFEFEF]">
        <SelectValue placeholder="Input Karyawan" />
        </SelectTrigger>

        <SelectContent>
        {selectedUser?.npk && (
        <SelectItem value={selectedUser.npk}>
        {selectedUser.npk} - {selectedUser.name}
        </SelectItem>
        )}
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

        <div className="flex justify-start items-center gap-4">
        <Button
        disabled={!(selectedUser && email && role)}
        onClick={handleSubmit}
        className={`w-[386px] h-10 text-white ${
        selectedUser && email && role
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-gray-300 cursor-not-allowed"
        }`}
        >
        Ubah
        </Button>

        <span
        onClick={handleDelete}
        className="w-10 h-10 border border-red-600 rounded-lg p-3 cursor-pointer"
        >
        <Trash
        weight="fill"
        className="text-red-500 hover:text-red-600"
        />
        </span>
        </div>
</div>
      </DialogContent>

      {/* Modal Notifikasi */}
      <NotificationModal
        isOpen={isModalOpen}
        imageSrc={isSuccess ? "/HighFive.png" : "/Thumbs_Down.png"}
        title={isSuccess ? "Perubahan Berhasil" : "Perubahan Gagal"}
        message={
          isSuccess
            ? "Data pengguna berhasil diperbarui!"
            : "Gagal mengubah data pengguna. Silakan coba lagi."
        }
        buttonText="Oke"
        onConfirm={() => {
        setIsModalOpen(false);
        resetForm();
        onClose();
        }}
      />

      {/* Modal Konfirmasi Edit */}
      <ConfirmModal
        isOpen={showEditConfirm}
        imageSrc="/Questioning.png"
        title="Anda hendak melakukan perubahan"
        message={
          <>
            Apakah Anda yakin ingin merubah role{" "}
            <strong>{selectedUser?.name}</strong> dari{" "}
            <strong>
              {selectedUser?.role} - {role}
            </strong>
            ?
          </>
        }
        buttonText="Batal"
        buttonText2="Simpan perubahan"
        cancelButtonClass="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700"
        confirmButtonClass="bg-blue-500 hover:bg-blue-600 text-white"
        onConfirm={handleConfirmSubmit}
        onCancel={() => setShowEditConfirm(false)}
      />

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        imageSrc="/Questioning.png"
        title="Anda hendak melakukan perubahan"
        message={
          "Pengguna ini akan dihapus secara permanen dan tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?"
        }
        buttonText="Batal"
        buttonText2="Hapus Data"
        cancelButtonClass="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </Dialog>
  );
};

export default EditUserModal;
