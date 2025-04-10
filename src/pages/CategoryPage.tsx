
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import MovieCard from '@/components/MovieCard';
import { featuredProducts, featuredMovies, productCategories, movieCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScraperService } from '@/utils/ScraperService';
import ScraperControls, { ScraperOptions } from '@/components/ScraperControls';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, FilterX } from 'lucide-react';

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
  
  // State for products and loading
  const [items, setItems] = useState<(ProductCardProps | any)[]>(
    isMovie ? featuredMovies : featuredProducts
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScraperControls, setShowScraperControls] = useState(false);

  // E-commerce platforms for filtering
  const ecommercePlatforms = ScraperService.supportedSites.map(site => site.name);

  // Movie platforms for filtering
  const moviePlatforms = [
    'IMDb', 'Rotten Tomatoes', 'Metacritic', 'Fandango', 
    'BookMyShow', 'PVR Cinemas', 'INOX', 'AMC Theatres'
  ];

  const handleRefreshData = async () => {
    if (isMovie) {
      toast({
        title: "Movie scraping not implemented",
        description: "This demo only includes product scraping. Movie data would be similarly scraped in a full implementation.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const categoryName = id || 'general';
      
      toast({
        title: "Starting web scraping",
        description: `Simulating scraping for ${categoryName} products.`,
      });
      
      // Clear the cache to force a fresh "scrape"
      ScraperService.clearCache();
      
      // Use our scraper service
      const response = await ScraperService.scrapeProducts(categoryName);
      
      if (response.success && response.data) {
        setItems(response.data);
        toast({
          title: "Scraping complete",
          description: `Successfully scraped ${response.data.length} products.`,
        });
      } else {
        setError(response.error || "Unknown error occurred during scraping");
        toast({
          title: "Scraping failed",
          description: response.error || "Failed to scrape products",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      toast({
        title: "Scraping failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleStartScraping = (options: ScraperOptions) => {
    toast({
      title: "Starting custom scraping",
      description: `Simulating scraping from ${options.sites.length} sites for ${options.category} products.`,
    });
    
    setIsLoading(true);
    setError(null);
    
    // Simulate delay for scraping
    setTimeout(() => {
      ScraperService.clearCache();
      ScraperService.scrapeProducts(options.category)
        .then(response => {
          if (response.success && response.data) {
            setItems(response.data);
            toast({
              title: "Custom scraping complete",
              description: `Successfully scraped ${response.data.length} products according to your configuration.`,
            });
          } else {
            throw new Error(response.error || "Unknown error during scraping");
          }
        })
        .catch(error => {
          const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
          setError(errorMessage);
          toast({
            title: "Custom scraping failed",
            description: errorMessage,
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1500);
  };
  
  // Automatically run the "scraper" when the component mounts
  useEffect(() => {
    if (!isMovie) {
      handleRefreshData();
    }
  }, [id, isMovie]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.name || 'Category'}</h1>
            <p className="text-muted-foreground">
              {items.length} {isMovie ? 'movies' : 'products'} found
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowScraperControls(!showScraperControls)}
              className="gap-1"
            >
              {showScraperControls ? <FilterX className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
              {showScraperControls ? 'Hide Controls' : 'Scraper Controls'}
            </Button>
            <Button 
              onClick={handleRefreshData} 
              className="bg-purple-600 hover:bg-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scraping...
                </>
              ) : (
                'Refresh Data'
              )}
            </Button>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-72 space-y-6">
            {showScraperControls && !isMovie && (
              <ScraperControls 
                onStartScraping={handleStartScraping}
                isLoading={isLoading}
              />
            )}
            
            <div className="bg-card rounded-lg p-4 h-fit">
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
            
            {/* Web scraping notice */}
            <div className="bg-purple-50 border border-purple-200 rounded-md p-4 mb-6">
              <h3 className="font-medium text-purple-800 mb-2">Web Scraping Demo</h3>
              <p className="text-sm text-purple-700">
                This demonstrates how products could be collected from multiple e-commerce sites using web scraping.
                In a production environment, web scraping requires careful implementation to respect:
              </p>
              <ul className="text-sm text-purple-700 list-disc pl-5 mt-2">
                <li>Website Terms of Service</li>
                <li>Rate limiting and robots.txt directives</li>
                <li>Legal considerations in your jurisdiction</li>
              </ul>
            </div>
            
            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isLoading ? (
                // Show loading placeholders
                Array.from({ length: 8 }).map((_, index) => (
                  <ProductCard
                    key={`loading-${index}`}
                    id={`loading-${index}`}
                    name="Loading product..."
                    image="/placeholder.svg"
                    rating={0}
                    reviewCount={0}
                    lowestPrice={0}
                    sources={[{ name: 'Loading...', price: 0, logo: '/placeholder.svg' }]}
                    isLoading={true}
                  />
                ))
              ) : (
                // Show actual items
                items.map((item) => (
                  <React.Fragment key={item.id}>
                    {isMovie ? (
                      <MovieCard {...item} />
                    ) : (
                      <ProductCard {...item} />
                    )}
                  </React.Fragment>
                ))
              )}
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
