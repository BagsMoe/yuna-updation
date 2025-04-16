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
        <div className="flex justify-center items-center w-[400px] h-[100px] bg-[#0072FF] rounded-lg border-none">
        <Image src={imageSrc} alt="image" width={159} height={130} className="object-fill" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-gray-700 font-normal text-sm">{message}</p>
        </div>

        <Button
          onClick={handleClick}
          disabled={isLoading} // ❌ Disable saat loading
          className={`w-full font-medium bg-blue-500 text-white cursor-pointer hover:bg-blue-600 ${isLoading && 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-700'}`}
        >
          {isLoading ? 'Loading...' : buttonText}
        </Button>
      </div>
    </div>
  );
}
