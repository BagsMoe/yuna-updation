
import { useState } from 'react';
import { fakeLoginApi } from '@/utils/api';

export const useLogin = () => {
  const [serverError, setServerErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { npk: string; password: string; remember?: boolean }) => {
    setServerErrorMessage(null);
    setIsLoading(true);
    
    try {
      await fakeLoginApi(data);
      // Handle success
    } catch (error) {
      if (error instanceof Error) {
        setServerErrorMessage(error.message);
      } else {
        setServerErrorMessage('NPK/Kata Sandi tidak sesuai');
      }
    } finally {
      setIsLoading(false);
    }
  };

return { serverError, isLoading, handleLogin, setServerErrorMessage };
};