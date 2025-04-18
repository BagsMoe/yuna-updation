"use client";

// Import hook React dan komponen lain
import { useState, useEffect } from "react";
import EditUserModal from "../Modals/EditUserModal";
import { ConfirmModal } from "@/components/moleculs/Modals/ConfirmModal";
import { NotificationModal } from "@/components/moleculs/Modals/NotificationModal";

// Interface untuk mendefinisikan struktur data user
interface User {
  name: string;
  npk: string;
  role: string;
  email: string;
}

// Komponen utama tabel user
export default function TabelUser({
  users,             // Data semua user dari parent
  onUserEdited,      // Callback untuk refresh data setelah update
}: {
  users: User[];
  onUserEdited: () => void;
}) {
  // === State Management ===

  // User yang sedang dipilih untuk diedit
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Status pembuka modal edit
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Status pembuka modal konfirmasi
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Penanda apakah ini alur delete atau edit
  const [isDeleteFlow, setIsDeleteFlow] = useState(false);

  // Status pembuka modal notifikasi
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Status hasil (berhasil/gagal)
  const [isSuccess, setIsSuccess] = useState(false);

  // Status loading saat konfirmasi
  const [loading, setLoading] = useState(false);

  // User yang sedang diproses untuk edit atau delete
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  // Role lama sebelum perubahan (untuk ditampilkan di konfirmasi)
  const [previousRole, setPreviousRole] = useState<string | null>(null);

  // Data user yang sedang login
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Ambil data user yang sedang login dari localStorage saat awal load
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Ketika baris tabel diklik, tampilkan modal edit user
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Ketika user klik tombol "Ubah" di modal edit
  const handleEditClick = (updatedUser: User) => {
    setPreviousRole(selectedUser?.role ?? "");     // Simpan role sebelumnya
    setPendingUser(updatedUser);                  // Simpan data user yang akan diubah
    setEditModalOpen(false);                      // Tutup modal edit
    setIsDeleteFlow(false);                       // Tandai ini bukan proses delete
    setConfirmModalOpen(true);                    // Tampilkan modal konfirmasi
  };

  // Ketika user klik tombol "Hapus" di modal edit
  const handleDeleteClick = (user: User) => {
    setPendingUser(user);                         // Simpan data user yang akan dihapus
    setEditModalOpen(false);                      // Tutup modal edit
    setIsDeleteFlow(true);                        // Tandai ini proses delete
    setConfirmModalOpen(true);                    // Tampilkan modal konfirmasi
  };

  // Ketika user klik tombol "Simpan perubahan" atau "Hapus Data"
  const handleConfirmAction = () => {
    setLoading(true); // Tampilkan spinner loading

    setTimeout(() => {
      if (pendingUser && currentUser) {
        const stored = localStorage.getItem("users");
        let allUsers: User[] = stored ? JSON.parse(stored) : [];

        // 🚫 Cegah user menghapus dirinya sendiri
        if (isDeleteFlow && currentUser.npk === pendingUser.npk) {
          setIsSuccess(false);             // Tampilkan error
          setNotificationOpen(true);
          setConfirmModalOpen(false);
          setLoading(false);
          return;
        }

        // 🚫 Cegah user selain super admin melakukan perubahan
        if (!isDeleteFlow && currentUser.role !== "super admin") {
          setIsSuccess(false);             // Tampilkan error
          setNotificationOpen(true);
          setConfirmModalOpen(false);
          setLoading(false);
          return;
        }

        // ✅ Hapus user jika delete flow
        if (isDeleteFlow) {
          allUsers = allUsers.filter((u) => u.npk !== pendingUser.npk);
        } else {
          // ✅ Update user jika edit flow
          allUsers = allUsers.map((u) =>
            u.npk === pendingUser.npk ? pendingUser : u
          );
        }

        // Simpan hasil perubahan ke localStorage
        localStorage.setItem("users", JSON.stringify(allUsers));
        setIsSuccess(true);             // Tampilkan modal sukses
        setNotificationOpen(true);
        onUserEdited();                 // Panggil callback refresh data
      }

      setConfirmModalOpen(false);      // Tutup modal konfirmasi
      setLoading(false);               // Matikan loading
    }, 1000); // Simulasi delay
  };

  // Ketika user membatalkan konfirmasi
  const handleCancelConfirm = () => {
    setConfirmModalOpen(false);
    // Jika bukan delete dan user ingin kembali ke edit
    if (!isDeleteFlow && pendingUser) {
      setSelectedUser(pendingUser);
      setEditModalOpen(true);
    }
  };

  return (
    <>
      {/* === TABEL USER === */}
      <table className="w-full text-sm text-left mt-4">
        <thead className="text-gray-700">
          <tr className="flex justify-start items-center gap-4">
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">
              Nama
            </th>
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">
              NPK
            </th>
            <th className="w-[300px] py-2 px-4 border border-gray-300 rounded-xl">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            // Hanya ambil dua kata pertama dari nama
            const firstTwoWords = user.name.split(" ").slice(0, 2).join(" ");
            return (
              <tr
                key={idx}
                className="hover:bg-gray-50 flex justify-start items-center gap-4 border-b w-[938px] cursor-pointer"
                onClick={() => handleRowClick(user)} // Saat diklik, buka modal edit
              >
                <td className="w-[300px] py-2 px-4">{firstTwoWords}</td>
                <td className="w-[300px] py-2 px-4">{user.npk}</td>
                <td className="w-[300px] py-2 px-4">{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* === MODAL EDIT USER === */}
      {selectedUser && (
        <EditUserModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          user={selectedUser}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* === MODAL KONFIRMASI === */}
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
            "Pengguna ini akan dihapus secara permanen dan tidak dapat dikembalikan. Apakah Anda yakin ingin melanjutkan?"
          ) : (
            <>
              Apakah Anda yakin ingin merubah role{" "}
              <strong>{pendingUser?.name}</strong> dari{" "}
              <strong>{previousRole}</strong> -{" "}
              <strong>{pendingUser?.role}</strong>?
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

      {/* === MODAL NOTIFIKASI HASIL === */}
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
          setPendingUser(null); // Reset state setelah modal ditutup
        }}
      />
    </>
  );
}
