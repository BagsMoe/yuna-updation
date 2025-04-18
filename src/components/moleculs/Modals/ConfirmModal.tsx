"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  message: React.ReactNode;
  buttonText: string;
  buttonText2: string;
  cancelButtonClass?: string; // styling button batal
  confirmButtonClass?: string; // styling button konfirmasi
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  buttonText2,
  cancelButtonClass,
  confirmButtonClass,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm();
  };
 
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        className="flex flex-col items-center w-[452px] rounded-2xl text-center gap-6 px-8 py-4"
        onInteractOutside={(e) => e.preventDefault()}
        showCloseIcon={false}
      >
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
            </DialogTitle>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Button
            className={`${cancelButtonClass} w-1/2 h-10 cursor-pointer`}
            onClick={onCancel}
            disabled={isLoading}
          >
            {buttonText}
          </Button>

          <Button
            className={`${confirmButtonClass} w-1/2 h-10 cursor-pointer`}
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
