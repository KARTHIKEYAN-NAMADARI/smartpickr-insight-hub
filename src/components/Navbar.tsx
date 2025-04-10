
import React from "react";
import { Link } from "react-router-dom";
import { Search, Utensils, Package, ShoppingCart, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
            
            <div className="hidden md:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Products Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md">
                      <div className="grid grid-cols-2 gap-3 w-[400px]">
                        <Link to="/category/electronics" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Electronics</div>
                          <div className="text-xs text-muted-foreground">Compare gadgets and devices</div>
                        </Link>
                        <Link to="/category/home-appliances" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Home Appliances</div>
                          <div className="text-xs text-muted-foreground">Find the best home products</div>
                        </Link>
                        <Link to="/category/fashion" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Fashion</div>
                          <div className="text-xs text-muted-foreground">Clothing, accessories and more</div>
                        </Link>
                        <Link to="/category/best-sellers" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Best Sellers</div>
                          <div className="text-xs text-muted-foreground">Most popular items</div>
                        </Link>
                        <Link to="/category/all-products" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">All Products</div>
                          <div className="text-xs text-muted-foreground">Browse our complete catalog</div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Food Delivery Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center">
                      <Utensils className="h-4 w-4 mr-1" />
                      Food
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md">
                      <div className="grid grid-cols-2 gap-3 w-[400px]">
                        <Link to="/food/indian" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Indian</div>
                          <div className="text-xs text-muted-foreground">Compare across delivery platforms</div>
                        </Link>
                        <Link to="/food/italian" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Italian</div>
                          <div className="text-xs text-muted-foreground">Pizza, pasta and more</div>
                        </Link>
                        <Link to="/food/chinese" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Chinese</div>
                          <div className="text-xs text-muted-foreground">Noodles, dumplings and more</div>
                        </Link>
                        <Link to="/food/american" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">American</div>
                          <div className="text-xs text-muted-foreground">Burgers, fries and more</div>
                        </Link>
                        <Link to="/food" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">All Cuisines</div>
                          <div className="text-xs text-muted-foreground">Browse all food options</div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Quick Commerce Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      Quick Commerce
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md">
                      <div className="grid grid-cols-2 gap-3 w-[400px]">
                        <Link to="/quickcommerce/groceries" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Groceries</div>
                          <div className="text-xs text-muted-foreground">Essential food items</div>
                        </Link>
                        <Link to="/quickcommerce/fresh-vegetables" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Fresh Vegetables</div>
                          <div className="text-xs text-muted-foreground">Farm fresh produce</div>
                        </Link>
                        <Link to="/quickcommerce/dairy" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Dairy</div>
                          <div className="text-xs text-muted-foreground">Milk, cheese and more</div>
                        </Link>
                        <Link to="/quickcommerce/household" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Household</div>
                          <div className="text-xs text-muted-foreground">Cleaning products and essentials</div>
                        </Link>
                        <Link to="/quickcommerce" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">All Categories</div>
                          <div className="text-xs text-muted-foreground">Browse all quick commerce items</div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Movies Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex items-center">
                      <Film className="h-4 w-4 mr-1" />
                      Movies
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 rounded-md shadow-md">
                      <div className="grid grid-cols-2 gap-3 w-[400px]">
                        <Link to="/category/action" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Action</div>
                          <div className="text-xs text-muted-foreground">Thrilling action movies</div>
                        </Link>
                        <Link to="/category/comedy" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Comedy</div>
                          <div className="text-xs text-muted-foreground">Laugh-out-loud films</div>
                        </Link>
                        <Link to="/category/drama" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Drama</div>
                          <div className="text-xs text-muted-foreground">Emotional and captivating stories</div>
                        </Link>
                        <Link to="/category/sci-fi" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">Sci-Fi</div>
                          <div className="text-xs text-muted-foreground">Futuristic and space adventures</div>
                        </Link>
                        <Link to="/category/movies" className="group block p-2 rounded-md hover:bg-slate-50">
                          <div className="font-medium text-sm">All Movies</div>
                          <div className="text-xs text-muted-foreground">Browse our complete collection</div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex md:hidden">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/category/all-products" className="flex items-center text-xs">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Products
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/food" className="flex items-center text-xs">
                  <Utensils className="h-4 w-4 mr-1" />
                  Food
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/quickcommerce" className="flex items-center text-xs">
                  <Package className="h-4 w-4 mr-1" />
                  Quick
                </Link>
              </Button>
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
