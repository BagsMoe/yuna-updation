'use client';

import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent } from 'react';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  serverError?: boolean;
  disabled?: boolean;
  suppressErrorStyle?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string; // Tambahkan value prop
};

export const InputText = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = 'text',
  placeholder,
  required = false,
  serverError = false,
  disabled = false,
  suppressErrorStyle = false,
  onChange,
  value,
}: FormInputProps<T>) => {
  const { onChange: registerOnChange, ...restRegister } = register(name);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    registerOnChange(e); // Handle form registration
    onChange?.(e); // Trigger custom onChange jika ada
  };

  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        {...restRegister}
        onChange={handleChange}
        value={value}
        className={`mt-1 block w-full rounded-md ${
          !suppressErrorStyle && (error || serverError)
          ? 'border-red-500 focus:ring-red-500'
          : 'focus:ring-blue-500'
        }`}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
      />
    </div>
  );
};