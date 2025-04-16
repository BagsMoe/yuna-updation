import { useState } from "react";
import { useRouter } from "next/navigation";

// Tipe untuk data user
interface User {
  name: string;
  npk: string;
  email: string;
  password: string;
  role: string;
}

// Tipe untuk input form login
interface LoginFormData {
  npk: string;
  password: string;
  remember: boolean;
}

// Custom hook untuk proses login
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);         // State loading
  const [serverError, setServerError] = useState<string>("");         // State untuk error dari server
  const router = useRouter();

  // Fungsi utama untuk handle login
  const handleLogin = async ({ npk, password, remember }: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setServerError("");

    try {
      const res = await fetch("/api/users");
      const users: User[] = await res.json();

      const matchedUser = users.find(
        (user) => user.npk === npk && user.password === password
      );

      if (matchedUser) {
        // Hapus destructuring yang menghilangkan password
        localStorage.setItem("user", JSON.stringify(matchedUser)); // Simpan seluruh data user termasuk password

        if (remember) {
          localStorage.setItem("rememberMe", "true");
        }

        router.push("/homepage");
      } else {
        setServerError("NPK/Kata Sandi tidak sesuai");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setServerError("Terjadi kesalahan saat mengakses data pengguna");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    serverError,
    handleLogin,
    setServerError,
  };
};
