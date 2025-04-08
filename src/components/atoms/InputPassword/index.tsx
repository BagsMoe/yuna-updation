'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { cn } from '@/lib/utils'; // Pastikan Anda memiliki utility class ini

type InputPasswordProps = {
  register: UseFormRegisterReturn<'password'>;
  error?: FieldError;
  className?: string;
};

export const InputPassword = ({
  register,
  error,
  className
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn('space-y-1', className)}>
      <Label htmlFor="password">
        Kata Sandi <span className="text-red-500">*</span>
      </Label>
      
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Masukkan Kata Sandi"
          {...register}
          className={cn(
            'pr-10', // Memberikan ruang untuk icon
            error && 'border-red-500'
          )}
        />
        
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};