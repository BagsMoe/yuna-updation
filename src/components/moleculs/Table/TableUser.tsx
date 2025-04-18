'use client';

import { useState } from "react";
import EditUserModal from "../Modals/EditUserModal";
import { ConfirmModal } from "@/components/moleculs/Modals/ConfirmModal";
import { NotificationModal } from "@/components/moleculs/Modals/NotificationModal";

// Interface untuk mendefinisikan struktur data pengguna
interface User {
  name: string;
  npk: string;
  role: string;
  email: string;
}

// Komponen utama tabel user
export default function TabelUser({
  users, // Daftar user yang ditampilkan
  onUserEdited, // Callback ketika data user berhasil diedit
}: {
  users: User[];
  onUserEdited: () => void;
}) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // User yang dipilih
  const [editModalOpen, setEditModalOpen] = useState(false); // Status modal edit

  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // Status modal konfirmasi
  const [isDeleteFlow, setIsDeleteFlow] = useState(false); // Penanda mode delete
  const [notificationOpen, setNotificationOpen] = useState(false); // Status modal notifikasi
  const [isSuccess, setIsSuccess] = useState(false); // Status hasil aksi
  const [loading, setLoading] = useState(false); // Status loading saat konfirmasi

  const [pendingUser, setPendingUser] = useState<User | null>(null); // Data user yang akan diproses
  const [previousRole, setPreviousRole] = useState<string | null>(null); // Role sebelumnya, untuk tampilan konfirmasi

  // Ketika baris tabel diklik, buka modal edit
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Ketika tombol edit di modal ditekan
  const handleEditClick = (updatedUser: User) => {
    setPreviousRole(selectedUser?.role ?? ""); // Simpan role lama
    setPendingUser(updatedUser); // Simpan data user yang akan diedit
    setEditModalOpen(false); // Tutup modal edit
    setIsDeleteFlow(false); // Pastikan bukan mode delete
    setConfirmModalOpen(true); // Buka modal konfirmasi
  };

  // Ketika tombol delete di modal ditekan
  const handleDeleteClick = (user: User) => {
    setPendingUser(user);
    setEditModalOpen(false);
    setIsDeleteFlow(true); // Aktifkan mode delete
    setConfirmModalOpen(true);
  };

  // Ketika konfirmasi disetujui
  const handleConfirmAction = () => {
    setLoading(true); // Tampilkan loading

    // Simulasi delay seperti proses API
    setTimeout(() => {
      if (pendingUser) {
        // Ambil data users dari localStorage
        const stored = localStorage.getItem("users");
        let allUsers: User[] = stored ? JSON.parse(stored) : [];

        // Jika delete, hapus user
        if (isDeleteFlow) {
          allUsers = allUsers.filter((u) => u.npk !== pendingUser.npk);
        } else {
          // Jika edit, update user
          allUsers = allUsers.map((u) =>
            u.npk === pendingUser.npk ? pendingUser : u
          );
        }

        // Simpan kembali ke localStorage
        localStorage.setItem("users", JSON.stringify(allUsers));
        setIsSuccess(true); // Tampilkan modal sukses
        setNotificationOpen(true);
        onUserEdited(); // Trigger refresh data parent
      }
      setConfirmModalOpen(false);
      setLoading(false);
    }, 1000);
  };

  // Ketika konfirmasi dibatalkan
  const handleCancelConfirm = () => {
    setConfirmModalOpen(false);
    // Jika bukan delete dan ada user, kembalikan ke modal edit
    if (!isDeleteFlow && pendingUser) {
      setSelectedUser(pendingUser);
      setEditModalOpen(true);
    }
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
          {users.map((user, idx) => {
            const firstTwoWords = user.name.split(" ").slice(0, 2).join(" ");
            return (
              <tr
                key={idx}
                className="hover:bg-gray-50 flex justify-start items-center gap-4 border-b w-[938px] cursor-pointer"
                onClick={() => handleRowClick(user)}
              >
                <td className="w-[300px] py-2 px-4">{firstTwoWords}</td>
                <td className="w-[300px] py-2 px-4">{user.npk}</td>
                <td className="w-[300px] py-2 px-4">{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal Edit */}
      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* Modal Konfirmasi */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        imageSrc="/Questioning.png"
        title={
          isDeleteFlow ? "Anda hendak menghapus data" : "Anda hendak melakukan perubahan"
        }
        message={
          isDeleteFlow ? (
            "Pengguna ini akan dihapus secara permanen dan tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?"
          ) : (
            <>
              Apakah Anda yakin ingin merubah role{" "}
              <strong>{pendingUser?.name}</strong> dari{" "}
              <strong>{previousRole}</strong> - <strong>{pendingUser?.role}</strong>?
            </>
          )
        }
        buttonText="Batal"
        buttonText2={isDeleteFlow ? "Hapus Data" : "Simpan perubahan"}
        cancelButtonClass="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700"
        confirmButtonClass={`${
          isDeleteFlow
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelConfirm}
        loading={loading}
      />

      {/* Modal Notifikasi */}
      <NotificationModal
        isOpen={notificationOpen}
        imageSrc={isSuccess ? "/HighFive.png" : "/Thumbs_Down.png"}
        title={isSuccess ? "Perubahan Berhasil" : "Perubahan Gagal"}
        message={
          isSuccess
            ? "Data pengguna berhasil diperbarui!"
            : "Gagal mengubah data pengguna. Silakan coba lagi."
        }
        buttonText="Oke"
        onConfirm={() => {
          setNotificationOpen(false);
          setPendingUser(null); // Reset pending user
        }}
      />
    </>
  );
}
