import { Search } from "./icons";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`group relative ${className}`}>
      <Search
        size={32}
        aria-hidden="true"
        className="z-10 pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9ca3] transition-colors duration-200 group-focus-within:text-secondary/80"
      />

      {/* <Search
        size={18}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-red-500"
      /> */}

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-10 w-full rounded-full border border-border bg-card/80 pl-10 pr-4 text-sm text-secondary outline-none backdrop-blur-sm transition-all duration-200 placeholder:text-[#9a9ca3] hover:border-secondary/50 focus:border-secondary/80 focus:bg-secondary/10 focus:ring-2 focus:ring-secondary/20 sm:w-60"
      />
    </div>
  );
}
