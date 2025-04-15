"use client"; // Menandakan bahwa komponen ini harus dijalankan di sisi klien (Client Component)

import { useForm } from "react-hook-form"; // Import hook untuk menangani form
import { yupResolver } from "@hookform/resolvers/yup"; // Integrasi schema validasi Yup dengan React Hook Form
import { ErrorAlert } from "@/components/atoms/Errors/ErrorAlert"; // Komponen untuk menampilkan pesan error dari server
import { InputText } from "@/components/atoms/Form/InputText"; // Komponen input teks untuk form
import { InputPassword } from "@/components/atoms/Form/InputPassword"; // Komponen input password
import { Checkbox } from "@/components/atoms/Form/Checkbox"; // Komponen checkbox
import { SubmitButton } from "@/components/atoms/SubmitButton"; // Komponen tombol submit
import { LoginHeader } from "@/components/atoms/LoginHeader"; // Komponen header untuk halaman login
import * as yup from "yup"; // Yup digunakan untuk membuat schema validasi
import { useLogin } from "@/hooks/useLogin"; // Custom hook untuk menangani proses login

// Tipe data untuk form login
type FormData = {
  npk: string;
  password: string;
  remember: boolean;
};

// Schema validasi menggunakan Yup
export const loginSchema = yup.object({
  npk: yup.string().required("NPK wajib diisi"), // Validasi: harus diisi
  password: yup.string().required("Kata sandi wajib diisi"), // Validasi: harus diisi
  remember: yup.boolean().default(false).required(), // Nilai default false, tetap wajib diisi
});

export default function HalamanMasuk() {
  // Destruktur dari custom hook useLogin
  const { serverError, isLoading, handleLogin } = useLogin();

  // Inisialisasi React Hook Form dengan schema validasi Yup
  const {
    register, // Fungsi untuk mendaftarkan input ke form
    handleSubmit, // Fungsi untuk menangani submit form
    formState: { errors, isValid }, // Objek untuk error dan validasi form
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema), // Integrasi Yup sebagai resolver
    mode: "onChange", // Validasi akan dilakukan setiap kali ada perubahan input
    defaultValues: {
      remember: false, // Nilai default checkbox
    },
  });

  // Fungsi yang akan dipanggil saat form disubmit
  const onSubmit = async (data: FormData) => {
    await handleLogin(data); // Kirim data ke fungsi login
  };

  return (
    <div className="flex flex-1/2 justify-center items-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)} // Tangani submit form dengan validasi
        className="w-[400px] p-0 m-0 bg-white space-y-6" // Styling form
      >
        {/* Header halaman login */}
        <LoginHeader />

        {/* Tampilkan error dari server jika ada */}
        {serverError && <ErrorAlert message={serverError} />}

        {/* Input NPK */}
        <InputText<FormData>
          name="npk"
          label="NPK"
          register={register}
          error={errors.npk}
          serverError={!!serverError} // Jika ada error server, beri efek styling
          placeholder="Masukkan NPK"
          required
        />

        {/* Input Password */}
        <InputPassword<"password"> // Tentukan tipe generic
          register={register("password")} // Daftarkan input ke form
          error={errors.password}
          serverError={!!serverError}
        />

        {/* Checkbox Remember Me dan Link Lupa Sandi */}
        <div className="flex items-center justify-between">
          <Checkbox register={register("remember")} /> {/* Checkbox remember */}
          <a
            href="/lupa-sandi"
            className="text-sm text-blue-500 hover:underline"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Tombol Submit */}
        <SubmitButton
          disabled={!isValid || isLoading || !!serverError} // Disable jika form tidak valid, sedang loading, atau ada error server
          isLoading={isLoading} // Tampilkan spinner jika sedang loading
          disabledCursor="not-allowed" // Ubah kursor saat tombol tidak bisa diklik
        />
      </form>
    </div>
  );
}
