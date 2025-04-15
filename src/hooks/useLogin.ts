import { useState } from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/data/dummyUser";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const handleLogin = async ({
    npk,
    password,
    remember,
  }: {
    npk: string;
    password: string;
    remember: boolean;
  }) => {
    setIsLoading(true);
    setServerError("");

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (npk === dummyUser.npk && password === dummyUser.password) {
          const { ...userWithoutPassword } = dummyUser;
          localStorage.setItem("user", JSON.stringify(userWithoutPassword));
          if (remember) {
            localStorage.setItem("rememberMe", "true");
          }
          router.push("/homepage");
          resolve(); // hanya resolve jika sukses
        } else {
          setServerError("NPK/Kata Sandi tidak sesuai");
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  return {
    isLoading,
    serverError,
    handleLogin,
    setServerError,
  };
};
