import LoginForm from "@/components/moleculs/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <main className="flex w-1/2 min-h-screen items-center justify-center py-8 pl-8 ">
      <div className="w-full max-w-md p-auto bg-white rounded-lg">
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
