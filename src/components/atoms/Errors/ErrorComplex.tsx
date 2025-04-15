"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

type ErrorComplexProps = {
  password: string;
};

export const ErrorComplex: React.FC<ErrorComplexProps> = ({ password }) => {
  if (!password) return null;

  const minLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  // Filter hanya requirement yang belum terpenuhi
  const unmetRequirements = [];

  if (!minLength) unmetRequirements.push("Minimal 6 karakter");
  if (!(hasUpper && hasLower)) unmetRequirements.push("Huruf kapital dan kecil (A-Z, a-z)");
  if (!hasSpecial) unmetRequirements.push("Minimal 1 karakter khusus (!@#$%^&*)");

  if (unmetRequirements.length === 0) return null;

  return (
    <div className="flex justify-start items-start text-xs text-red-500 space-x-1.5">
      <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      <div>
        <p>Kata sandi harus termasuk:</p>
        <ul className="list-disc pl-4">
          {unmetRequirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
