"use client";
import Link from "next/link";
import { UserInfoCard } from "@/components/moleculs/Card/DataCard";
import { User } from "@phosphor-icons/react";
import FormCard from "@/components/moleculs/Card/FormCard";

export default function PengaturanAkunPage() {
  return (
    <div className="flex justify-start items-start h-full gap-4 px-6 py-4 bg-white">
      <div className="w-[264px] pt-[50px] pl-6 pr-10">
        <Link
          href="/pengaturan-akun"
          className="flex gap-1.5 bg-[#165FF0] text-white justify-start items-center w-52 h-12 rounded-[8px] px-[14px] py-[28px] "
        >
          <User size={24} weight="fill" /> Pengaturan Akun
        </Link>
      </div>
      <div>
        <UserInfoCard />
        <FormCard />
      </div>
    </div>
  );
}
