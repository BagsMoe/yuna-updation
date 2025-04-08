
'use client';

import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  disabled: boolean;
  isLoading: boolean;
};

export const SubmitButton = ({ disabled, isLoading }: SubmitButtonProps) => (
  <Button
    type="submit"
    disabled={disabled}
    className={`w-full ${!disabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'} text-white`}
  >
    {isLoading ? 'Memproses...' : 'Masuk'}
  </Button>
);