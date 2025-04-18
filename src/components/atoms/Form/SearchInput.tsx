import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "phosphor-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <div className="flex justify-start items-center pl-4 gap-2 rounded-xl border border-[#D5D5D5] focus:outline-none focus:ring-1 focus:ring-blue-400">
      <MagnifyingGlass
        size={18}
        className=" text-gray-400 pr-0"
      />
      <Input
        type="text"
        placeholder={placeholder || "Cari data"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-0 py-2 text-sm border-none"
      />
    </div>
  );
};
