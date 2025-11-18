import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
}

export default function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Type medication name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 pl-12 pr-4 text-lg"
          data-testid="input-medication-search"
          autoFocus
        />
      </div>
      <p className="text-base text-muted-foreground text-center">
        Try searching: Lisinopril, Metformin, or Zoloft
      </p>
    </div>
  );
}
