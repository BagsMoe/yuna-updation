'use client'; // Menandakan bahwa komponen ini berjalan di sisi klien (Client Component)

import Image from "next/image"; // Import komponen gambar dari Next.js
import { Button } from "@/components/ui/button"; // Komponen tombol
import { InputPassword } from "@/components/atoms/Form/InputPassword"; // Komponen input password custom
import { ErrorComplex } from "@/components/atoms/Errors/ErrorComplex"; // Komponen untuk validasi password kompleks
import { useForm } from "react-hook-form"; // Hook form dari React Hook Form
import * as yup from "yup"; // Yup untuk validasi schema
import { yupResolver } from "@hookform/resolvers/yup"; // Integrasi yup dengan React Hook Form
import { HelperErrorText } from "@/components/atoms/Errors/HelperErrorText"; // Komponen error helper
import { useState } from "react"; // React state
import { SuccessModal } from "@/components/atoms/Modal/SuccessModal"; // Modal setelah sukses submit

// Schema validasi menggunakan Yup
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required(" ") // Required tapi pesan dikosongkan agar tidak ditampilkan default-nya
    .min(6, " ") // Minimal 6 karakter
    .matches(/[A-Z]/, "Harus mengandung huruf kapital") // Harus ada huruf kapital
    .matches(/[a-z]/, "Harus mengandung huruf kecil") // Harus ada huruf kecil
    .matches(/[!@#$%^&*]/, "Harus mengandung karakter khusus"), // Harus ada karakter khusus
  confirmPassword: yup
    .string()
    .required(" ")
    .oneOf([yup.ref("newPassword")], "Kata sandi tidak sama"), // Harus sama dengan newPassword
});

// Tipe data input form
type FormAturSandiData = {
  newPassword: string;
  confirmPassword: string;
};

export default function FormAturSandi() {
  // Inisialisasi React Hook Form dengan Yup resolver
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormAturSandiData>({
    resolver: yupResolver(schema), // Gunakan schema yup untuk validasi
    mode: "onChange", // Validasi dijalankan setiap ada perubahan input
  });

  // Ambil nilai input secara real-time
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  // State untuk mengatur tampilan modal sukses
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi saat submit form
  const onSubmit = (data: FormAturSandiData) => {
    console.log("Password berhasil diubah:", data); // Simulasi response
    setIsModalOpen(true); // Tampilkan modal setelah submit
  };

  return (
    <div className="flex flex-1/2 justify-center items-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)} // Handle submit menggunakan handleSubmit dari React Hook Form
        className="flex flex-col justify-center items-center p-0 w-[400px]"
      >
        <div className="flex flex-col justify-center items-center gap-10 w-full">
          {/* Gambar ilustrasi */}
          <Image
            src="/ResetPassword.png"
            alt="Reset Password"
            width={400}
            height={100}
            className="object-cover"
          />

          <div className="w-full bg-white space-y-6">
            {/* Judul dan deskripsi */}
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
                error={undefined} // Tidak menampilkan error bawaan yup
                className="w-full"
                serverError={false}
                label="Kata Sandi Baru"
              />
              {/* Tampilkan validasi kompleks jika ada input */}
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
              {/* Tampilkan pesan error jika password tidak cocok */}
              {confirmPassword && errors.confirmPassword && (
                <HelperErrorText
                  error={errors.confirmPassword}
                  messages={{ oneOf: "Kata sandi tidak sama" }}
                />
              )}
            </div>
          </div>

          {/* Tombol Konfirmasi */}
          <Button
            type="submit"
            disabled={!isValid} // Disable jika form tidak valid
            className={`w-full ${
              isValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 text-gray-700 cursor-not-allowed"
            }`}
          >
            Konfirmasi
          </Button>
        </div>
      </form>

      {/* Modal sukses setelah submit */}
      <SuccessModal
        isOpen={isModalOpen}
        imageSrc="/ResetPassword.png"
        title="Pembaruan Kata Sandi Berhasil"
        message="Silahkan kembali ke halaman Login dan masuk dengan kata sandi baru."
        buttonText="Kembali Ke Login"
        redirectPath="/masuk" // Arahkan ke halaman login setelah berhasil
        onConfirm={() => setIsModalOpen(false)} // Tutup modal jika diklik
      />
    </div>
  );
}
