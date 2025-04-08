
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full items-center">
      <Input
        type="text"
        placeholder="Search products, movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-10 w-full"
      />
      <Button 
        type="submit" 
        size="icon" 
        variant="ghost" 
        className="absolute right-0"
      >
        <Search className="h-5 w-5" />
      </Button>
      {onClose && (
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={onClose} 
          className="absolute right-10"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
