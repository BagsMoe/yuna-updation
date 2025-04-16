"use client"; // Menandakan bahwa komponen ini dijalankan di sisi klien

// Import hooks dan library untuk form dan validasi
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Import komponen UI
import { InputPassword } from "@/components/atoms/Form/InputPassword";
import { HelperErrorText } from "@/components/atoms/Errors/HelperErrorText";
import { ErrorComplex } from "@/components/atoms/Errors/ErrorComplex";
import { Button } from "@/components/ui/button";
import { NotificationModal } from "@/components/atoms/Cards/NotificationModal";

interface User {
  password: string; // Tipe data untuk password
}
// Tipe data untuk form
type FormAturSandiData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

// Skema validasi menggunakan yup
const schema = yup.object().shape({
  oldPassword: yup.string().required(" "),
  newPassword: yup
    .string()
    .required(" ")
    .min(6, " ")
    .matches(/[A-Z]/, "Harus mengandung huruf kapital")
    .matches(/[a-z]/, "Harus mengandung huruf kecil")
    .matches(/[!@#$%^&*]/, "Harus mengandung karakter khusus"),
  confirmPassword: yup
    .string()
    .required(" ")
    .oneOf([yup.ref("newPassword")], "Kata sandi tidak sama"),
});

export default function FormCard() {
  // Gunakan useForm dari react-hook-form dengan schema validasi dari yup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<FormAturSandiData>({
    resolver: yupResolver(schema),
    mode: "onChange", // Validasi dijalankan saat field diubah
  });

  // State untuk mengontrol modal dan status perubahan password
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ambil nilai input secara live untuk newPassword dan confirmPassword
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  // Fungsi yang dijalankan saat form disubmit
  const onSubmit = (data: FormAturSandiData) => {
    // Ambil data user dari localStorage
    const userData = localStorage.getItem("user");

    // Handle jika tidak ada user yang login
    if (!userData) {
      setError("oldPassword", {
        message: "Sesi telah berakhir, silakan login kembali",
      });
      setIsSuccess(false);
      setIsModalOpen(true);
      return;
    }

    try {
      // Parse data user
      const user: User = JSON.parse(userData);

      // Validasi password lama
      if (data.oldPassword !== user.password) {
        setError("oldPassword", {
          message: "Kata sandi yang Anda masukkan salah",
        });
        setIsSuccess(false);
        setIsModalOpen(true);
        return;
      }

      // Jika validasi berhasil
      setIsSuccess(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error parsing user data:", error);
      setError("oldPassword", {
        message: "Terjadi kesalahan saat memverifikasi password",
      });
      setIsSuccess(false);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <h1 className="text-xl font-medium">Perubahan Kata Sandi</h1>

      {/* Form Perubahan Kata Sandi */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[700px] space-y-6"
      >
        <div className="flex flex-col">
        {/* Input Kata Sandi Lama */}
        <div className="flex flex-col w-full">
          <InputPassword<"oldPassword">
            register={register("oldPassword")}
            error={undefined}
            className={`w-[342px] font-medium ${
              errors.oldPassword ? "border-red-500" : ""
            }`}
            serverError={!!errors.oldPassword}
            label="Kata Sandi Lama"
          />
          {/* Tampilkan pesan error jika password lama salah */}
          {errors.oldPassword && (
            <HelperErrorText
              error={errors.oldPassword}
              messages={{
                required: " ",
                message: "Kata sandi yang Anda masukkan salah",
              }}
            />
          )}
        </div>
        </div>

        {/* Input Kata Sandi Baru dan Konfirmasi */}
        <div className="flex justify-center gap-4">
          {/* Kata Sandi Baru */}
          <div className="w-1/2 flex flex-col">
            <InputPassword<"newPassword">
              register={register("newPassword")}
              error={undefined}
              className="w-[342px] font-medium"
              serverError={false}
              label="Kata Sandi Baru"
            />
            {/* Tampilkan validasi kompleks jika user sudah mulai mengetik */}
            {newPassword && <ErrorComplex password={newPassword} />}
          </div>

          {/* Konfirmasi Kata Sandi Baru */}
          <div className="w-1/2 flex flex-col">
            <InputPassword<"confirmPassword">
              register={register("confirmPassword")}
              error={undefined}
              className="w-[342px] font-medium"
              serverError={false}
              label="Konfirmasi Kata Sandi"
            />
            {/* Tampilkan pesan jika konfirmasi tidak sesuai */}
            {errors.confirmPassword && confirmPassword !== "" && (
              <HelperErrorText
                error={errors.confirmPassword}
                messages={{ oneOf: "Kata sandi tidak sama" }}
              />
            )}
          </div>
        </div>

        {/* Tombol Simpan */}
        <div className="flex justify-end w-full">
          <div className="w-1/2 flex justify-end">
            <Button
              type="submit"
              disabled={!isValid} // Disable tombol jika form tidak valid
              className={`w-[183px] h-[46px] ${
                isValid
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-[#D5D5D5] text-gray-600 cursor-not-allowed"
              }`}
            >
              Simpan Kata Sandi
            </Button>
          </div>
        </div>
      </form>

      {/* Modal Notifikasi */}
      <NotificationModal
        isOpen={isModalOpen}
        imageSrc={isSuccess ? "/Password_Changed.png" : "/Thumbs_Down.png"}
        title={
          isSuccess
            ? "Kata Sandi Berhasil Diubah"
            : "Perubahan Kata Sandi Gagal"
        }
        message={
          isSuccess
            ? "Kata sandi Anda berhasil diubah. Gunakan kata sandi baru kali selanjutnya Anda masuk."
            : "Gagal mengubah password. Silakan coba lagi."
        }
        buttonText="Baik"
        onConfirm={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
