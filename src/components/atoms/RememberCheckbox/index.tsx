'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UseFormRegisterReturn } from 'react-hook-form';

type RememberCheckboxProps = {
  register: UseFormRegisterReturn<'remember'>;
};

export const RememberCheckbox = ({ register }: RememberCheckboxProps) => (
  <div className="flex items-center space-x-2">
    <Checkbox id="remember" {...register} />
    <Label htmlFor="remember" className="text-sm">
      Ingat Saya
    </Label>
  </div>
);