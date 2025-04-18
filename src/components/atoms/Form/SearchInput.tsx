import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "phosphor-react";

// Tipe props untuk komponen SearchInput
interface SearchInputProps {
  placeholder?: string;               // Placeholder teks di input (opsional)
  value: string;                      // Nilai input saat ini
  onChange: (value: string) => void;  // Fungsi yang dipanggil saat input berubah
  disabled?: boolean;                 // (Opsional) Untuk men-disable input
  className?: string;                 // (Opsional) Tambahan class jika diperlukan
}

// Komponen SearchInput untuk pencarian data
export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  return (
    // Wrapper dengan icon dan input, desain rounded dengan border abu-abu
    <div className="flex justify-start items-center pl-4 gap-2 rounded-xl border border-[#D5D5D5] focus:outline-none focus:ring-1 focus:ring-blue-400">
      {/* Icon kaca pembesar dari Phosphor React */}
      <MagnifyingGlass
        size={18}
        className="text-gray-400 pr-0"
      />
      {/* Input teks untuk pencarian */}
      <Input
        type="text"
        placeholder={placeholder || "Cari data"}       // Default placeholder jika tidak ada
        value={value}                                  // Nilai input terikat pada props
        onChange={(e) => onChange(e.target.value)}     // Trigger fungsi onChange saat mengetik
        className="w-full pl-0 py-2 text-sm border-none" // Styling input
      />
    </div>
  );
};
