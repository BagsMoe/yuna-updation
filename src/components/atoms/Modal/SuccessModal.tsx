'use client'; // 🚨 Wajib di App Router Next.js untuk komponen yang menggunakan hooks sisi klien

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Tombol kustom
import { useRouter } from "next/navigation"; // Navigasi client-side dari Next.js

// 🧩 Tipe props yang dikirim ke komponen SuccessModal
interface SuccessModalProps {
  isOpen: boolean;         // Modal ditampilkan atau tidak
  imageSrc: string;        // URL gambar ilustrasi sukses
  title: string;           // Judul utama modal
  message: string;         // Pesan deskripsi tambahan
  buttonText: string;      // Teks pada tombol aksi
  redirectPath: string;    // Alamat tujuan redirect
  onConfirm: () => void;   // Fungsi callback saat tombol diklik
}

// ✅ Komponen modal sukses
export function SuccessModal({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  redirectPath,
  onConfirm,
}: SuccessModalProps) {
  const router = useRouter(); // Hook navigasi

  // 🛑 Jika modal belum diaktifkan, tidak tampilkan apa-apa
  if (!isOpen) return null;

  // 🚀 Fungsi saat tombol diklik
  const handleClick = () => {
    onConfirm();            // Jalankan fungsi tambahan (misalnya: reset form)
    router.push(redirectPath); // Arahkan ke halaman yang ditentukan
  };

  return (
    // 📦 Bungkus modal — menempel di sisi kiri layar, setengah lebar
    <div className="fixed top-0 left-0 h-screen w-1/2 bg-white z-50 flex items-center justify-center">
      {/* 🧱 Konten utama modal */}
      <div className="flex flex-col justify-center items-center gap-10 w-[400px]">
        {/* 📷 Ilustrasi sukses */}
        <Image src={imageSrc} alt="Success" width={400} height={100} />

        {/* 📝 Judul & pesan */}
        <div className="space-y-3">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-gray-700 font-normal">{message}</p>
        </div>

        {/* 🔘 Tombol aksi */}
        <Button
          onClick={handleClick}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
