
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
                SmartPickr
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/category/electronics" className="text-gray-700 hover:text-primary">
                Electronics
              </Link>
              <Link to="/category/home-appliances" className="text-gray-700 hover:text-primary">
                Home Appliances
              </Link>
              <Link to="/category/fashion" className="text-gray-700 hover:text-primary">
                Fashion
              </Link>
              <Link to="/category/movies" className="text-gray-700 hover:text-primary">
                Movies
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isSearchOpen ? (
              <div className="absolute left-0 top-0 w-full bg-white p-3 md:static md:w-auto md:bg-transparent md:p-0">
                <SearchBar onClose={() => setIsSearchOpen(false)} />
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <div className="hidden md:block w-80">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
