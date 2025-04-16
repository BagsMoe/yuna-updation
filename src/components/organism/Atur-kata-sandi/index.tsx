"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/atoms/Form/InputPassword";
import { ErrorComplex } from "@/components/atoms/Errors/ErrorComplex";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HelperErrorText } from "@/components/atoms/Errors/HelperErrorText";
import { useEffect, useState } from "react";
import { ConfirmCard } from "@/components/atoms/Cards/ConfirmCard";

// Validasi Yup
const schema = yup.object().shape({
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

// Tipe data form
type FormAturSandiData = {
  newPassword: string;
  confirmPassword: string;
};

export default function FormAturSandi() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<FormAturSandiData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Watch field
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  // Status untuk menampilkan confirm card
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true); // status berhasil/gagal

  // Saat error confirm password hilang karena perbaikan, clear error helper text
  useEffect(() => {
    if (confirmPassword === newPassword) {
      clearErrors("confirmPassword");
    }
  }, [confirmPassword, newPassword, clearErrors]);

  // Handler submit
  const onSubmit = (data: FormAturSandiData) => {
    // Simulasi jika password mengandung %, anggap gagal
    if (data.newPassword.includes("%") || data.confirmPassword.includes("%")) {
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
    }

    setIsConfirmOpen(true); // Tampilkan confirm card
  };

  return (
    <div className="flex flex-1/2 justify-center items-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center p-0 w-[400px]"
      >
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          {/* Ilustrasi */}
          <div className="flex justify-center items-center w-[400px] h-[100px] bg-[#0072FF] rounded-lg">
          <Image
            src="/SuccessChanged.png"
            alt="Reset Password"
            width={159}
            height={100}
            className="object-cover"
          />
        </div>
          <div className="w-full bg-white space-y-6">
            {/* Judul */}
            <div className="space-y-3">
              <h1 className="text-xl font-semibold">Konfirmasi Kata Sandi!</h1>
              <p className="text-sm text-gray-600">
                Pesan konfirmasi akan dikirimkan ke dalam email Anda!
              </p>
            </div>

            {/* Input Kata Sandi Baru */}
            <div className="gap-2">
              <InputPassword<"newPassword">
                register={register("newPassword")}
                error={undefined}
                className="w-full"
                serverError={false}
                label="Kata Sandi Baru"
              />
              {/* Validasi kompleks */}
              {newPassword && <ErrorComplex password={newPassword} />}
            </div>

            {/* Input Konfirmasi Kata Sandi */}
            <div className="gap-2">
              <InputPassword<"confirmPassword">
                register={register("confirmPassword")}
                error={undefined}
                className="w-full"
                serverError={false}
                label="Konfirmasi Kata Sandi"
              />
              {/* Tampilkan error helper jika tidak cocok */}
              {errors.confirmPassword && confirmPassword !== "" && (
                <HelperErrorText
                  error={errors.confirmPassword}
                  messages={{ oneOf: "Kata sandi tidak sama" }}
                />
              )}
            </div>
          </div>

          {/* Tombol Submit */}
          <Button
            type="submit"
            disabled={!isValid} // Disable hanya jika form masih error
            className={`w-full cursor-pointer ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            Konfirmasi
          </Button>
        </div>
      </form>

      {/* Konfirmasi setelah submit */}
      <ConfirmCard
        isOpen={isConfirmOpen}
        imageSrc={
          isSuccess ? "/SuccessChanged.png" : "/FailedChanged.png"
        }
        title={
          isSuccess
            ? "Pembaruan Kata Sandi Berhasil"
            : "Pembaruan Kata Sandi Gagal"
        }
        message={
          isSuccess
            ? "Silahkan kembali ke halaman Login dan masuk dengan kata sandi baru."
            : "Maaf, proses perubahan kata sandi tidak berhasil. Silahkan kembali ke halaman Login untuk mengulangi proses"
        }
        buttonText="Kembali Ke Login"
        redirectPath="/masuk"
        onConfirm={() => {}} // Tidak menutup confirm card, langsung redirect saja
        
      />
    </div>
  );
}
