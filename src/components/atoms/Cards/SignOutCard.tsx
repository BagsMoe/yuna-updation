"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SignOutCardProps = {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  message: string;
  buttonText: string;
  buttonText2: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const SignOutCard = ({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  buttonText2,
  onConfirm,
  onCancel,
}: SignOutCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        className="flex flex-col items-center w-[452px] rounded-2xl text-center gap-6 px-8 py-4"
        // Properti khusus untuk menyembunyikan ikon "X" (jika diimplementasikan di komponen DialogContent)

        onInteractOutside={(e) => e.preventDefault()} // Mencegah interaksi di luar dialog
      >
        {" "}
        <div className="flex flex-col items-center w-[380px] gap-3">
          <Image
            src={imageSrc}
            alt="Notification"
            width={200}
            height={100}
            className="object-cover rounded-lg"
          />
          <div>
            <DialogTitle className="text-[16px] font-medium">
              {title}
            </DialogTitle>{" "}
            {/* Judul modal */}
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            className="bg-[#FBFBFB] cursor-pointer hover:border-red-700 hover:border hover:bg-transparent text-red-700 w-1/2 h-10"
            onClick={onCancel}
            disabled={isLoading}
          >
            {buttonText}
          </Button>

          <Button
            className="bg-[#E15241] cursor-pointer hover:bg-red-600 text-white w-1/2 h-10"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : buttonText2}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
