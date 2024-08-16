import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  placeholder?: string;
  width?: number;
}

export default function SearchBar({ query, setQuery, placeholder = "Search...", width = 200 }: SearchBarProps) {
  return (
    <div className="relative flex justify-end items-center text-foreground" style={{ width }}>
      <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <Input className="pl-10"
        type="text" 
        placeholder={placeholder} 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
    </div>
  );
}
