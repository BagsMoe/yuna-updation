"use client"; // Menandakan ini adalah komponen client-side (Next.js App Router)

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Komponen UI
import { ErrorAlert } from "@/components/atoms/Errors/ErrorAlert";
import { InputText } from "@/components/atoms/Form/InputText";
import { InputPassword } from "@/components/atoms/Form/InputPassword";
import { Checkbox } from "@/components/atoms/Form/Checkbox";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { LoginHeader } from "@/components/atoms/LoginHeader";
import  LoadingOverlay  from "@/components/atoms/Loader/LoadingOverlay";

// Validasi
import * as yup from "yup";

// Custom hook login
import { useLogin } from "@/hooks/useLogin";


// Tipe data untuk form
type FormData = {
  npk: string;
  password: string;
  remember: boolean;
};

// Yup schema untuk validasi form
export const loginSchema = yup.object({
  npk: yup.string().required("NPK wajib diisi"),
  password: yup.string().required("Kata sandi wajib diisi"),
  remember: yup.boolean().default(false).required(),
});

export default function HalamanMasuk() {
  // Ambil state & function dari custom hook login
  const { serverError, isLoading, handleLogin, setServerError } = useLogin();

  // Setup form react-hook-form + yup
  const {
    register,            // Untuk registrasi field input
    handleSubmit,        // Untuk handle submit form
    watch,               // Untuk observasi perubahan nilai input
    formState: { errors, isValid }, // Validasi dan error form
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema), // Integrasi Yup ke RHF
    mode: "onChange",                   // Validasi otomatis saat input berubah
    defaultValues: {
      remember: false,                  // Checkbox default: tidak dicentang
    },
  });

  // Reset server error ketika user mulai mengubah NPK atau password
  const npkValue = watch("npk");
  const passwordValue = watch("password");
  
  useEffect(() => {
    setServerError("");
  }, [npkValue, passwordValue, setServerError]);
  
  // Handler submit form
  const onSubmit = async (data: FormData) => {
    await handleLogin(data);
  };

  return (
    <div className="flex flex-1/2 justify-center items-center py-16">
      { isLoading && <LoadingOverlay /> } {/* Loading spinner */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] p-0 m-0 bg-white space-y-6"
      >
        {/* Judul halaman login */}
        <LoginHeader />

        {/* Error alert dari server (misal: kombinasi npk/password salah) */}
        {serverError && <ErrorAlert message={serverError} />}

        {/* Input NPK */}
        <InputText<FormData>
          name="npk"
          label="NPK"
          register={register}
          error={errors.npk || undefined}      // Error dari Yup, akan hilang kalau serverError aktif (bisa di-adjust lagi kalau mau)
          serverError={!!serverError}          // Untuk styling merah jika ada error dari server
          placeholder="Masukkan NPK"
          required
        />

        {/* Input Password */}
        <InputPassword<"password">
          register={register("password")}
          error={errors.password}              // Error dari Yup
          serverError={!!serverError}          // Styling merah kalau server error
        />

        {/* Checkbox Remember Me + Link lupa password */}
        <div className="flex items-center justify-between">
          <Checkbox register={register("remember")} />
          <a
            href="/lupa-kata-sandi"
            className="text-sm text-blue-500 hover:underline"
          >
            Lupa Kata Sandi?
          </a>
        </div>

        {/* Tombol Submit */}
        <SubmitButton
          disabled={!isValid || isLoading || !!serverError} // Disable jika: form invalid, sedang loading, atau ada error server
          isLoading={isLoading}                             // Loading spinner
          disabledCursor="not-allowed"                      // Ganti cursor saat disable
        />
      </form>
    </div>
  );
}
