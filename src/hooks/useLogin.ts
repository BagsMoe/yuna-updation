
import { useState } from 'react';
import { fakeLoginApi } from '@/utils/api';

export const useLogin = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { npk: string; password: string; remember?: boolean }) => {
    setServerError(null);
    setIsLoading(true);
    
    try {
      await fakeLoginApi(data);
      // Handle success
    } catch (error) {
      setServerError("NPK/Kata Sandi tidak sesuai");
    } finally {
      setIsLoading(false);
    }
  };

  return { serverError, isLoading, handleLogin };
};