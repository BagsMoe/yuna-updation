"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

type SignOutCardProps = {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  message: string;
  buttonText: string;
  buttonText2: string;
  onConfirm: () => void;
};

export const SignOutCard = ({
  isOpen,
  imageSrc,
  title,
  message,
  buttonText,
  buttonText2,
  onConfirm,
}: SignOutCardProps) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onConfirm}>
      <DialogContent
        className="flex flex-col items-center w-[452px] rounded-2xl text-center gap-6 px-8 py-4"
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle>
            <VisuallyHidden>{title}</VisuallyHidden>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center w-[380px] gap-3">
          <Image
            src={imageSrc}
            alt="Notification"
            width={200}
            height={100}
            className="object-cover rounded-lg"
          />
          <div>
            <h2 className="text-[16px] font-medium">{title}</h2>
            <p className="text-sm text-gray-600">{message}</p>
          </div>
        </div>

        <div className="flex gap-2 w-full">
          {/* Button pertama: hanya tutup modal */}
          <Button
            className="bg-[#FBFBFB] hover:border-red-700 hover:border hover:bg-transparent text-red-700 w-1/2 h-10"
            onClick={onConfirm}
          >
            {buttonText}
          </Button>

          {/* Button kedua: langsung redirect tanpa tutup modal */}
          <Button
            className="bg-[#E15241] hover:bg-red-600 text-white w-1/2 h-10"
            onClick={() => {
              router.push("/masuk");
            }}
          >
            {buttonText2}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
