'use client';

import { Alert, AlertDescription } from "@/components/ui/alert";
import { BadgeAlertIcon } from "lucide-react";

type ErrorAlertProps = {
  message: string;
};

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="">
      <AlertDescription className="flex justify-center "><BadgeAlertIcon /> 
      {message}</AlertDescription>
    </Alert>
  );
};