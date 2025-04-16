"use client"; // Menandakan komponen ini dijalankan di sisi klien (client-side)

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Import dialog dari UI
import Image from "next/image"; // Import Image component dari Next.js
import { Button } from "@/components/ui/button"; // Import custom button
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Untuk aksesibilitas, menyembunyikan konten dari tampilan tapi tetap terbaca screen reader

// Definisi tipe props untuk komponen modal ini
type NotificationModalProps = {
  isOpen: boolean; // Untuk mengatur apakah modal terbuka atau tidak
  imageSrc: string; // Path gambar yang ditampilkan dalam modal
  title: string; // Judul modal
  message: string; // Pesan utama modal
  buttonText: string; // Teks pada tombol konfirmasi
  onConfirm: () => void; // Fungsi yang dijalankan ketika tombol diklik atau modal ditutup
};

// Komponen utama NotificationModal
export const NotificationModal = ({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  onConfirm,
}: NotificationModalProps) => {
  return (
    // Wrapper dialog, menerima prop `open` untuk mengontrol visibilitas
    // `onOpenChange` akan dipanggil saat modal dibuka atau ditutup (dalam hal ini dipakai untuk close)
    <Dialog open={isOpen} onOpenChange={onConfirm}>
      <DialogContent
        className="flex flex-col items-center w-[452px] rounded-2xl text-center gap-6 px-8 py-4"
        // Properti khusus untuk menyembunyikan ikon "X" (jika diimplementasikan di komponen DialogContent)
      >
        <div className="flex flex-col items-center w-[380px] gap-3">
          <Image
            src={imageSrc}
            alt="Notification"
            width={200}
            height={100}
            className="object-cover rounded-lg"
          />
          <DialogTitle className="text-[16px] font-medium">{title}</DialogTitle>{" "}
          {/* Judul modal */}
          <p className="text-sm text-gray-600">{message}</p>{" "}
          {/* Pesan deskriptif */}
        </div>

        {/* Tombol aksi */}
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white w-full" // Tombol dengan warna biru dan hover
          onClick={onConfirm} // Saat tombol diklik, panggil fungsi `onConfirm`
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
