"use client";

import { useForm } from "react-hook-form"; // Library form utama
import { yupResolver } from "@hookform/resolvers/yup"; // Integrasi Yup ke React Hook Form
import * as yup from "yup"; // Validasi skema
import Image from "next/image";
import { InputText } from "@/components/atoms/Form/InputText"; // Komponen input kustom
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; // Icon panah kiri
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Navigasi di App Router
import { HelperErrorText } from "@/components/atoms/Errors/HelperErrorText"; // Komponen pesan error custom

// 📦 Tipe data form
type FormData = {
  email: string;
};

// ✅ Skema validasi email
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email wajib diisi") // Tidak boleh kosong
    .matches(/@acc\.co\.id$/, "Format email tidak sesuai"), // Harus pakai domain acc.co.id
});

export default function FormLupaSandi() {
  // 🧠 State untuk mengatur alur form
  const [isSubmitted, setIsSubmitted] = useState(false); // Untuk tahu apakah form sudah dikirim
  const [counter, setCounter] = useState(20); // Countdown kirim ulang email
  const [isEmailDisabled, setIsEmailDisabled] = useState(false); // Matikan input saat menunggu
  const [showErrors, setShowErrors] = useState(false); // Tampilkan error setelah submit
  const router = useRouter();

  // 🧰 Setup React Hook Form
  const {
    register,
    trigger, // Untuk manual trigger validasi
    watch,   // Melihat nilai input secara real-time
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange", // Validasi real-time
  });

  const emailValue = watch("email"); // Ambil nilai email terkini

  // 🧼 Sembunyikan error saat input dikosongkan
  useEffect(() => {
    if (!emailValue || emailValue === "") {
      setShowErrors(false);
    }
  }, [emailValue]);
  

  // ⏲️ Hitung mundur 20 detik
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSubmitted && counter > 0) {
      timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
    } else if (counter === 0) {
      setIsEmailDisabled(false); // Aktifkan input lagi
    }
    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, [isSubmitted, counter]);

  // 🕒 Mulai hitung mundur & disable input
  const startCountdown = () => {
    setIsSubmitted(true);
    setIsEmailDisabled(true);
    setCounter(20);
  };

  // 🔁 Reset form dan state
  const resetForm = () => {
    setIsSubmitted(false);
    setCounter(20);
    setIsEmailDisabled(false);
  };

  // 🚀 Submit handler (tidak langsung, validasi dulu)
  const onSubmit = async () => {
    const isEmailValid = await trigger("email"); // Validasi manual email

    if (!emailValue) {
      setShowErrors(false);
      return;
    }

    if (!isEmailValid) {
      setShowErrors(true); // Jika invalid, tampilkan error
      return;
    }

    setShowErrors(false);
    console.log("Email terkirim ke:", emailValue); // Debug: kirim email
    startCountdown(); // Mulai timer
  };

  // 🔒 Cek apakah email valid untuk kontrol tombol
  const isEmailValid = !errors.email && emailValue?.match(/@acc\.co\.id$/);
  const isButtonDisabled = showErrors || !isEmailValid;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col flex-1/2 justify-center items-center space-y-10"
    >
      {/* 🖼️ Gambar ilustrasi */}
      <Image
        src="/ForgotPassword.png"
        alt="Forgot Password"
        width={400}
        height={100}
        className="object-cover"
      />

      <div className="w-[400px] space-y-6 bg-white">
        {/* 🔙 Tombol kembali */}
        <a
          href="/masuk"
          className="flex items-center gap-4 text-blue-500 text-sm hover:underline"
        >
          <ArrowLeft className="w-[18px]" /> Kembali ke Log-in
        </a>

        {/* 📝 Judul & deskripsi kondisi tergantung status submit */}
        {!isSubmitted ? (
          <>
            <h1 className="text-xl font-bold">Input Email!</h1>
            <p className="text-sm text-gray-600">
              Tautan konfirmasi ganti kata sandi akan dikirimkan ke dalam email
              Anda!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">Email berhasil terkirim</h1>
            <p className="text-sm text-gray-600">
              Kami telah mengirimkan tautan untuk mengatur ulang kata sandi ke
              email Anda. Periksa folder Inbox atau Spam/Junk jika email tidak
              muncul dalam beberapa menit.
            </p>
          </>
        )}

        {/* 📩 Input Email */}
        <div className="space-y-1.5">
        <InputText
  name="email"
  label="Email"
  placeholder="contoh@acc.co.id"
  register={register}
  error={emailValue ? errors.email : undefined} // Hanya tampilkan error jika ada input
  suppressErrorStyle={!emailValue || !errors.email} // Hilangkan style merah saat kosong
  type="email"
  required
  disabled={isSubmitted && isEmailDisabled}
  onChange={(e) => {
    console.log("Input berubah:", e.target.value);
  }}
/>


          {/* 🧯 Pesan error */}
          <HelperErrorText
  error={emailValue ? errors.email : undefined} // Sembunyikan jika kosong
  messages={{
    required: "Email wajib diisi",
    matches: "Format email tidak sesuai",
  }}
/>

        </div>

        {/* 🚪 Tombol kirim atau kirim ulang */}
        {!isSubmitted ? (
          <Button
            type="submit"
            disabled={isButtonDisabled} // Tombol disable kalau error
            className={`w-full ${
              isButtonDisabled
                ? "bg-[#D5D5D5] text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            }`}
          >
            Kirim Link
          </Button>
        ) : (
          <p className="text-sm text-gray-600">
            Tidak menerima email?{" "}
            {counter > 0 ? (
              <span className="text-[#B1B1B1] font-normal">
                Kirim ulang ({counter} detik)
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  resetForm(); // Reset form
                  router.push("/konfirmasi-kata-sandi"); // Arahkan ke halaman berikutnya
                }}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Kirim ulang email
              </button>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
