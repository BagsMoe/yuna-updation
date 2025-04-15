'use client';

import { UseFormRegisterReturn } from 'react-hook-form';

type RememberCheckboxProps = {
  register: UseFormRegisterReturn<'remember'>;
};

export const Checkbox = ({ register }: RememberCheckboxProps) => (
  <div className="flex items-center space-x-2">
    <input
      id="remember"
      type="checkbox"
      {...register}
      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
    />
    <label
      htmlFor="remember"
      className="text-sm font-normal text-[#222222]"
    >
      Ingat Saya
    </label>
  </div>
);