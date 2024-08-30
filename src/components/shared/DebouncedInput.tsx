import { InputHTMLAttributes, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";

interface DebouncedInputProps {
  value: string | number,
  onChange: (value: string | number) => void,
  placeholder?: string,
  width?: number,
  delay?: number,
}

export default function DebouncedInput({
  value: initialValue,
  onChange,
  placeholder = "Search...",
  width = 200,
  delay = 500,
  ...props
}: DebouncedInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative flex">
      <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <Input className="pl-10"
        type="text"
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        placeholder={placeholder}
        style={{ width }}
        {...props}
      />
    </div>
  );
}
