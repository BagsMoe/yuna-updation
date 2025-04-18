import { useState } from "react";
import { useRouter } from "next/navigation";

// Tipe untuk data user yang diambil dari database atau API
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
  // State untuk menandai proses loading saat login
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State untuk menyimpan error dari server jika terjadi kesalahan
  const [serverError, setServerError] = useState<string>("");

  // Router dari Next.js untuk navigasi setelah login
  const router = useRouter();

  // Fungsi utama untuk menangani proses login
  const handleLogin = async ({
    npk,
    password,
    remember,
  }: LoginFormData): Promise<void> => {
    setIsLoading(true);        // Set loading true saat proses login dimulai
    setServerError("");        // Reset error sebelumnya

    try {
      // Ambil data user dari API lokal
      const res = await fetch("/api/users");
      const users: User[] = await res.json();

      // Cari user yang cocok dengan NPK dan password yang dimasukkan
      const matchedUser = users.find(
        (user) => user.npk === npk && user.password === password
      );

      if (matchedUser) {
        // Simpan data user ke localStorage (termasuk password untuk validasi lokal selanjutnya)
        localStorage.setItem("userData", JSON.stringify(matchedUser));

        // Jika centang "Ingat Saya", simpan flag di localStorage
        if (remember) {
          localStorage.setItem("rememberMe", "true");
        }

        // Arahkan user ke halaman homepage setelah berhasil login
        router.push("/homepage");
      } else {
        // Jika tidak ditemukan user yang cocok, tampilkan pesan error
        setServerError("NPK/Kata Sandi tidak sesuai");
      }
    } catch (error) {
      // Tangani error yang terjadi saat fetch data
      console.error("Error fetching users:", error);
      setServerError("Terjadi kesalahan saat mengakses data pengguna");
    } finally {
      // Setelah proses selesai, set loading menjadi false
      setIsLoading(false);
    }
  };

  // Return semua state dan fungsi yang dibutuhkan untuk proses login
  return {
    isLoading,         // Status loading untuk ditampilkan di UI
    serverError,       // Error dari server untuk ditampilkan ke user
    handleLogin,       // Fungsi utama login
    setServerError,    // Fungsi untuk reset atau ubah error dari luar
  };
};
