'use client';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  disabledCursor?: string; // Properti untuk menentukan kursor saat tombol disabled
};

export const SubmitButton = ({
  disabled,
  isLoading,
  disabledCursor = 'not-allowed', // Default cursor untuk tombol disabled
}: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={disabled}
    disabledCursor={disabledCursor} // Teruskan properti disabledCursor ke komponen Button
    className={`w-full ${
      !disabled
        ? 'cursor-pointer bg-blue-500 hover:bg-blue-600'
        : 'bg-gray-300'
    } text-white`}
  >
    {isLoading ? 'Memproses...' : 'Masuk'}
  </Button>
);