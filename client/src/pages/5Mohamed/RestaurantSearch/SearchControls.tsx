import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface Props {
  onSearch?: (q: string) => void;
}

export default function SearchControls({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    onSearch?.(q);
  };
  return (
    <div className="flex gap-4 mb-10">
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search restaurants, cuisines, or dishes..."
          className="w-full h-14 pl-12 pr-4 border border-gray-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        />
      </div>
      <div className="w-48 relative">
        <select className="w-full h-14 px-4 pr-10 border border-gray-300 rounded-xl bg-gray-100 text-gray-700 appearance-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
          <option>Choose option...</option>
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
      </div>
    </div>
  );
}


