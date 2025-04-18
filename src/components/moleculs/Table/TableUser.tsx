"use client";

import { useState, useEffect } from "react";
import EditUserModal from "../Modals/EditUserModal";
import { ConfirmModal } from "@/components/moleculs/Modals/ConfirmModal";
import { NotificationModal } from "@/components/moleculs/Modals/NotificationModal";

// Interface untuk mendefinisikan struktur data User
interface User {
  name: string;
  npk: string;
  role: string;
  email: string;
}

// Komponen utama untuk menampilkan dan mengatur interaksi tabel user
export default function TabelUser({
  users,
  onUserEdited,
}: {
  users: User[];
  onUserEdited: () => void;
}) {

  // ================== Kumpulan State ====================

  // State untuk user yang dipilih saat klik baris tabel
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // State untuk membuka/tutup modal edit
  const [editModalOpen, setEditModalOpen] = useState(false);
  // State untuk membuka/tutup modal konfirmasi
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  // State untuk membuka/tutup modal notifikasi
  const [notificationOpen, setNotificationOpen] = useState(false);
  // State untuk membedakan flow edit dan hapus
  const [isDeleteFlow, setIsDeleteFlow] = useState(false);
  // State untuk menandai apakah aksi berhasil
  const [isSuccess, setIsSuccess] = useState(false);
  // State loading untuk tombol konfirmasi
  const [loading, setLoading] = useState(false);

  // State untuk menyimpan data user yang akan diproses (edit/hapus)
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  // Menyimpan role sebelumnya agar bisa dibandingkan saat edit
  const [previousRole, setPreviousRole] = useState<string | null>(null);

  // State untuk user yang sedang login (dari localStorage)
  const [currentUser, setCurrentUser] = useState<{
    npk: string;
    role: string;
  } | null>(null);

  // ================== Kumpulan Fungsi ====================

  // Ambil data user yang sedang login dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setCurrentUser({
        npk: parsedData.npk,
        role: parsedData.role.toLowerCase(),
      });
    }
  }, []);

  // Saat user klik salah satu baris di tabel, simpan user tersebut dan buka modal edit
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Saat tombol 'Ubah' diklik di modal edit
  const handleEditClick = (updatedUser: User) => {
    setPreviousRole(selectedUser?.role ?? "");
    setPendingUser(updatedUser);
    localStorage.setItem("pendingUser", JSON.stringify(updatedUser)); // simpan sementara di localStorage
    setEditModalOpen(false);
    setIsDeleteFlow(false); // ini flow edit
    setConfirmModalOpen(true);
  };

  // Saat tombol 'Hapus' diklik di modal edit
  const handleDeleteClick = (user: User) => {
    setPendingUser(user);
    localStorage.setItem("pendingUser", JSON.stringify(user)); // simpan sementara di localStorage
    setEditModalOpen(false);
    setIsDeleteFlow(true); // ini flow hapus
    setConfirmModalOpen(true);
  };

  // Saat pengguna menekan tombol konfirmasi di ConfirmModal
  const handleConfirmAction = () => {
    setLoading(true); // set loading untuk tombol konfirmasi

    setTimeout(() => {
      const storedUsers = localStorage.getItem("users");
      const pending = localStorage.getItem("pendingUser");
      const parsedPending: User | null = pending ? JSON.parse(pending) : null;
      const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      let success = false;

      // Validasi: hanya super admin yang bisa edit atau hapus user lain (bukan dirinya sendiri)
      if (
        currentUser &&
        currentUser.role === "super admin" &&
        parsedPending &&
        currentUser.npk !== parsedPending.npk
      ) {
        if (isDeleteFlow) {
          // Proses hapus user
          const updatedUsers = parsedUsers.filter(
            (u) => u.npk !== parsedPending.npk
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          success = true;
        } else {
          // Proses update user
          const updatedUsers = parsedUsers.map((u) =>
            u.npk === parsedPending.npk ? parsedPending : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          success = true;
        }
      }

      // Jika user mencoba edit atau hapus dirinya sendiri, blokir
      if (parsedPending && currentUser?.npk === parsedPending.npk) {
        success = false;
      }

      // Update UI sesuai hasil
      setIsSuccess(success);
      setConfirmModalOpen(false);
      setNotificationOpen(true);
      setLoading(false);
      localStorage.removeItem("pendingUser");

      // Jika berhasil, panggil fungsi untuk reload data
      if (success) onUserEdited();
    }, 1000);
  };

  // Jika user batal konfirmasi, buka kembali EditUserModal dengan data sebelumnya
  const handleCancelConfirm = () => {
    setConfirmModalOpen(false);
    const pending = localStorage.getItem("pendingUser");
    const parsedPending: User | null = pending ? JSON.parse(pending) : null;

    if (parsedPending) {
      setSelectedUser(parsedPending);
      setEditModalOpen(true);
    }

    localStorage.removeItem("pendingUser");
  };

  // Fungsi untuk menentukan isi NotificationModal berdasarkan flow dan hasil
  const getNotificationMessage = (): { title: string; message: string } => {
    if (isDeleteFlow) {
      return isSuccess
        ? {
            title: "Pengguna berhasil dihapus",
            message: "pengguna tidak lagi dapat mengakses dashboard",
          }
        : {
            title: "Pengguna gagal dihapus",
            message:
              "Data tidak dapat dihapus saat ini. Silakan coba lagi nanti.",
          };
    } else {
      return isSuccess
        ? {
            title: "Perubahan berhasil disimpan",
            message: "Data pengguna berhasil diperbarui",
          }
        : {
            title: "Perubahan Data Gagal",
            message: "Gagal menyimpan perubahan. Coba lagi nanti.",
          };
    }
  };

  // Jika data user berubah, sinkronkan kembali selectedUser dari tabel
  useEffect(() => {
  const currentSelectedUser = selectedUser; // Simpan nilai saat ini
  if (currentSelectedUser) {
    const updatedUser = users.find((u) => u.npk === currentSelectedUser.npk);
    if (updatedUser) setSelectedUser(updatedUser);
  }
}, [users]);

  return (
    <>
      {/* Tabel data pengguna */}
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

      {/* Modal untuk edit user */}
      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          user={selectedUser}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* Modal konfirmasi edit atau hapus */}
      <ConfirmModal
        isOpen={confirmModalOpen}
        imageSrc="/Questioning.png"
        title={
          isDeleteFlow
            ? "Anda hendak menghapus data"
            : "Anda hendak melakukan perubahan"
        }
        message={
          isDeleteFlow ? (
            "Pengguna ini akan dihapus secara permanen dan tidak dapat dikembalikan. " +
            (currentUser?.npk === pendingUser?.npk
              ? "[System blocked: Cannot delete yourself]"
              : "Apakah Anda yakin ingin melanjutkan?")
          ) : (
            <>
              {currentUser?.npk === pendingUser?.npk ? (
                "[System blocked: Cannot edit your own role]"
              ) : (
                <>
                  Apakah Anda yakin ingin merubah role{" "}
                  <strong>{pendingUser?.name}</strong> dari{" "}
                  <strong>{previousRole}</strong> ke{" "}
                  <strong>{pendingUser?.role}</strong>?
                </>
              )}
            </>
          )
        }
        buttonText="Batal"
        buttonText2={isDeleteFlow ? "Hapus Data" : "Simpan perubahan"}
        cancelButtonClass="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700 cursor-pointer"
        confirmButtonClass={`cursor-pointer ${
          isDeleteFlow
            ? "bg-red-600 hover:bg-red-700"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelConfirm}
        loading={loading}
      />

      {/* Modal notifikasi hasil akhir */}
      <NotificationModal
        isOpen={notificationOpen}
        imageSrc={isSuccess ? "/HighFive.png" : "/Thumbs_Down.png"}
        title={getNotificationMessage().title}
        message={getNotificationMessage().message}
        buttonText="Oke"
        onConfirm={() => {
          setNotificationOpen(false);
          // Reset jika gagal, supaya bisa diproses ulang
          if (!isSuccess) {
            setPendingUser(null);
            setSelectedUser(null);
          }
        }}
      />
    </>
  );
}
