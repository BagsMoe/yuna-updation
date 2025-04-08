"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorAlert } from "@/components/atoms/ErrorAlert";
import { FormInput } from "@/components/atoms/FormInput";
import { RememberCheckbox } from "@/components/atoms/RememberCheckbox";
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { loginSchema } from "@/utils/schemas/LoginSchema";
import { useLogin } from "@/hooks/useLogin";
import { InputPassword } from "@/components/atoms/InputPassword";
import { LoginHeader } from "@/components/atoms/LoginHeader";

type FormData = {
  npk: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  const { serverError, isLoading, handleLogin } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      remember: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    await handleLogin(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      {/* Header */}
      <LoginHeader />

      {/* Error Alert */}
      {serverError && <ErrorAlert message={serverError} />}
      
      {/* NPK Input */}
      <FormInput<FormData>
        name="npk"
        label="NPK"
        register={register}
        error={errors.npk}
        required
      />
     
      {/* Password Input */}
      <InputPassword register={register("password")} error={errors.password} />
      
      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <RememberCheckbox register={register("remember")} />
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Lupa Kata Sandi?
        </a>
      </div>
     
      {/* Submit Button */}
      <SubmitButton disabled={!isValid || isLoading} isLoading={isLoading} />
    </form>
  );
}
