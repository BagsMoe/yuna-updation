'use client';

import { UseFormRegister, FieldError, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
};

export const FormInput = <T extends FieldValues>({
  name,
  label,
  register,
  error,
  type = 'text',
  required = false
}: FormInputProps<T>) => (
  <div>
    <Label htmlFor={name}>
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </Label>
    <Input
      id={name}
      type={type}
      {...register(name)}
      className={`mt-1 ${error ? 'border-red-500' : ''}`}
      aria-invalid={!!error}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);