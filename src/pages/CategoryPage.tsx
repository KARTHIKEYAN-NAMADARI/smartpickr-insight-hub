
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import MovieCard from '@/components/MovieCard';
import { featuredProducts, featuredMovies, productCategories, movieCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const CategoryPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Determine if we're showing products or movies based on the category ID
  const isMovie = id === 'movies' || movieCategories.some(cat => cat.id === id);
  
  // Find the category details
  const category = isMovie 
    ? id === 'movies' 
      ? { name: 'All Movies', count: featuredMovies.length } 
      : movieCategories.find(cat => cat.id === id)
    : id === 'all-products' 
      ? { name: 'All Products', count: featuredProducts.length }
      : productCategories.find(cat => cat.id === id);
  
  // Items to display based on category
  const items = isMovie ? featuredMovies : featuredProducts;

  // E-commerce platforms for filtering
  const ecommercePlatforms = [
    'Amazon', 'Flipkart', 'Snapdeal', 'Etsy', 'Myntra', 
    'ShopClues', 'eBay', 'Tata Cliq', 'Wix', 'Meesho',
    'Nykaa', 'Shopify', 'Walmart', 'AJIO', 'Alibaba',
    'Beyond', 'Paytm Mall', 'AliExpress', 'Amazon India', 
    'Bonanza', 'FirstCry', 'Jabong.com'
  ];

  // Movie platforms for filtering
  const moviePlatforms = [
    'IMDb', 'Rotten Tomatoes', 'Metacritic', 'Fandango', 
    'BookMyShow', 'PVR Cinemas', 'INOX', 'AMC Theatres'
  ];

  const handleRefreshData = () => {
    toast({
      title: "Data Refresh",
      description: "Fetching latest data from all platforms. This would connect to backend APIs in a production environment.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.name || 'Category'}</h1>
            <p className="text-muted-foreground">
              {category?.count || 0} {isMovie ? 'movies' : 'products'} found
            </p>
          </div>
          <Button onClick={handleRefreshData} className="bg-purple-600 hover:bg-purple-700">
            Refresh Data
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-72 bg-card rounded-lg p-4 h-fit">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Rating</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating4" />
                    <Label htmlFor="rating4">4+ Stars</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating3" />
                    <Label htmlFor="rating3">3+ Stars</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rating2" />
                    <Label htmlFor="rating2">2+ Stars</Label>
                  </div>
                </div>
              </div>
              
              {!isMovie && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price1" />
                      <Label htmlFor="price1">Under $100</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price2" />
                      <Label htmlFor="price2">$100 - $300</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price3" />
                      <Label htmlFor="price3">$300 - $500</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price4" />
                      <Label htmlFor="price4">$500+</Label>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium mb-2">Sources</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
                  {isMovie ? (
                    <>
                      {moviePlatforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox id={`platform-${platform}`} />
                          <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {ecommercePlatforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox id={`platform-${platform}`} />
                          <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    {!isMovie && <SelectItem value="price-low">Price: Low to High</SelectItem>}
                    {!isMovie && <SelectItem value="price-high">Price: High to Low</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">View:</span>
                <div className="flex border rounded-md overflow-hidden">
                  <button className="p-1 px-2 bg-muted">Grid</button>
                  <button className="p-1 px-2">List</button>
                </div>
              </div>
            </div>
            
            {/* Real-time data notice */}
            <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6">
              <h3 className="font-medium text-purple-800 mb-2">Real-time Data Integration</h3>
              <p className="text-sm text-purple-700">
                In a production environment, this page would display real-time data from 
                {isMovie ? ' movie theaters and review sites' : ' all selected e-commerce platforms'}.
                Data would update automatically to show the latest prices, availability, and reviews.
              </p>
            </div>
            
            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  {isMovie ? (
                    <MovieCard {...item} />
                  ) : (
                    <ProductCard {...item} />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex">
                <Button variant="outline" size="sm" className="rounded-r-none">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0 bg-muted">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Simplified version */}
      <footer className="bg-navy text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 SmartPickr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
