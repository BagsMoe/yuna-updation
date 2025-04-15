'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";

type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert variant="default" className="bg-[#FCEBEE] border-[#E15241] ">
      <AlertDescription className="flex justify-start items-center text-red-600 ">
       <Image
       src="/alert.svg"
        alt="alert"
        width={20}
        height={20} 
        className="mr-2"
       />
      {message}</AlertDescription>
    </Alert>
  );
};