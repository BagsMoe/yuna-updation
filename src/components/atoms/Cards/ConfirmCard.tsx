'use client';

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ConfirmCardProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  message: string;
  buttonText: string;
  redirectPath: string;
  onConfirm: () => void;
}

export function ConfirmCard({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  redirectPath,
  onConfirm,
}: ConfirmCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false); // ⏳ State loading

  if (!isOpen) return null;

  const handleClick = () => {
    setIsLoading(true);            // 🔃 Tampilkan loading
    onConfirm();                   // 🧼 Jalankan callback
    setTimeout(() => {
      router.push(redirectPath);   // 🚀 Arahkan setelah jeda pendek
    }, 500); // delay biar terlihat loading sebentar (opsional)
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/2 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-10 w-[400px]">
        <Image src={imageSrc} alt="Success" width={400} height={100} />

        <div className="space-y-3 text-center">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-gray-700 font-normal">{message}</p>
        </div>

        <Button
          onClick={handleClick}
          disabled={isLoading} // ❌ Disable saat loading
          className={`w-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 ${isLoading && 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-700'}`}
        >
          {isLoading ? 'Loading...' : buttonText}
        </Button>
      </div>
    </div>
  );
}
