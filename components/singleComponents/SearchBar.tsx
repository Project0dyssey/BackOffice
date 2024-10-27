import { useState } from 'react';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

export function SearchBar({ setSearchTerm }: SearchBarProps) {
  const [term, setTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-end mb-4">
      <input
        type="text"
        placeholder="Buscar por nome ou ID..."
        value={term}
        onChange={handleSearch}
        className="p-2 rounded-md border border-gray-300 shadow-md placeholder-gray-500 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}
