"use client"; // Menandakan bahwa komponen ini dirender di sisi client (Next.js App Router)

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Komponen dialog kustom dari UI library
import Image from "next/image"; // Komponen optimasi gambar dari Next.js
import { Button } from "@/components/ui/button"; // Komponen button kustom
import React from "react";

// Tipe props yang diterima oleh ConfirmModal
export interface ConfirmModalProps {
  isOpen: boolean; // Status apakah modal terbuka
  imageSrc: string; // Path gambar yang ditampilkan
  title: string; // Judul modal
  message: string | React.ReactNode; // Pesan yang ditampilkan (bisa berupa teks atau elemen React)
  buttonText: string; // Label tombol "Cancel"
  buttonText2: string; // Label tombol "Confirm"
  cancelButtonClass?: string; // Optional class tambahan untuk tombol cancel
  confirmButtonClass?: string; // Optional class tambahan untuk tombol confirm
  onConfirm: () => void; // Fungsi saat tombol konfirmasi diklik
  onCancel: () => void; // Fungsi saat modal ditutup atau cancel
  loading?: boolean; // Status loading untuk tombol confirm
}

// Komponen modal konfirmasi
export const ConfirmModal = ({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  buttonText2,
  cancelButtonClass,
  confirmButtonClass,
  loading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    // Komponen Dialog utama, terbuka jika isOpen true
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        // Styling utama dialog
        className="flex flex-col items-center w-[452px] rounded-2xl text-center gap-6 px-8 py-4"
        
        // Mencegah modal tertutup jika klik di luar area
        onInteractOutside={(e) => e.preventDefault()}

        // Menghilangkan ikon close default (kalau disediakan oleh UI library)
        showCloseIcon={false}
      >
        {/* Kontainer gambar + teks */}
        <div className="flex flex-col items-center w-[380px] gap-3">
          <Image
            src={imageSrc}
            alt="Notification"
            width={200}
            height={100}
            className="object-cover rounded-lg" // Gambar disesuaikan dan dibulatkan
          />
          <div>
            <DialogTitle className="text-[16px] font-medium">
              {title} {/* Judul modal */}
            </DialogTitle>
            <p className="text-sm text-gray-600">{message}</p> {/* Pesan teks */}
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="flex gap-2 w-full">
          {/* Tombol cancel */}
          <Button
            className={`${cancelButtonClass} w-1/2 h-10 cursor-pointer`}
            onClick={onCancel}
            disabled={loading} // Disable saat loading
          >
            {buttonText}
          </Button>

          {/* Tombol confirm */}
          <Button
            onClick={onConfirm}
            className={` cursor-pointer ${confirmButtonClass} w-1/2 h-10`}
            disabled={loading} // Disable saat loading
          >
            {/* Tampilkan loading spinner jika sedang loading */}
            {loading ? (
              <div className="cursor-pointer flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              buttonText2
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
