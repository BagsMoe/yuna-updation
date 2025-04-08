'use client';

import Link from "next/link";

export const ForgotPasswordLink = () => (
  <Link 
    href="/forgot-password" 
    className="text-sm text-blue-500 hover:underline transition-colors"
  >
    Lupa Kata Sandi?
  </Link>
);