'use client';

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FailedModalProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  message: string;
  buttonText: string;
  redirectPath: string;
  onConfirm: () => void;
}

export function FailedModal({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  redirectPath,
  onConfirm,
}: FailedModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClick = () => {
    onConfirm();         
    router.push(redirectPath);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/2 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-10 w-[400px]">
        <Image src={imageSrc} alt="Failed" width={400} height={100} />
        <div className="space-y-3">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-gray-700 font-normal">{message}</p>
        </div>
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
