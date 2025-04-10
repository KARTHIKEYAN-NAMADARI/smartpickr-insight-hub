
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScraperService } from '@/utils/ScraperService';
import ScraperControls, { ScraperOptions } from '@/components/ScraperControls';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, FilterX, Utensils, Pizza, Sandwich, Coffee } from 'lucide-react';

const foodCategories = [
  { id: 'indian', name: 'Indian', icon: <Utensils className="h-5 w-5" /> },
  { id: 'italian', name: 'Italian', icon: <Pizza className="h-5 w-5" /> },
  { id: 'american', name: 'American', icon: <Sandwich className="h-5 w-5" /> },
  { id: 'chinese', name: 'Chinese', icon: <Utensils className="h-5 w-5" /> },
  { id: 'mexican', name: 'Mexican', icon: <Utensils className="h-5 w-5" /> },
  { id: 'japanese', name: 'Japanese', icon: <Utensils className="h-5 w-5" /> },
  { id: 'thai', name: 'Thai', icon: <Utensils className="h-5 w-5" /> },
  { id: 'cafe', name: 'Café', icon: <Coffee className="h-5 w-5" /> },
];

const FoodCategoryPage = () => {
  const { cuisine } = useParams();
  const { toast } = useToast();
  
  // Find the category details
  const category = cuisine 
    ? foodCategories.find(cat => cat.id === cuisine) 
    : { name: 'All Food Items', id: 'all' };
  
  // State for food items and loading
  const [foodItems, setFoodItems] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showScraperControls, setShowScraperControls] = useState(false);

  // Food delivery platforms for filtering
  const foodDeliveryPlatforms = ScraperService.foodDeliveryPlatforms.map(site => site.name);

  const handleRefreshData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const cuisineCategory = cuisine || 'general';
      
      toast({
        title: "Starting food scraping",
        description: `Simulating scraping for ${cuisineCategory} food items from delivery platforms.`,
      });
      
      // Clear the cache to force a fresh "scrape"
      ScraperService.clearCache();
      
      // Use our scraper service
      const response = await ScraperService.scrapeFoodItems(cuisineCategory);
      
      if (response.success && response.data) {
        setFoodItems(response.data);
        toast({
          title: "Scraping complete",
          description: `Successfully scraped ${response.data.length} food items.`,
        });
      } else {
        setError(response.error || "Unknown error occurred during scraping");
        toast({
          title: "Scraping failed",
          description: response.error || "Failed to scrape food items",
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
      title: "Starting custom food scraping",
      description: `Simulating scraping from ${options.sites.length} food delivery platforms.`,
    });
    
    setIsLoading(true);
    setError(null);
    
    // Simulate delay for scraping
    setTimeout(() => {
      ScraperService.clearCache();
      ScraperService.scrapeFoodItems(options.category)
        .then(response => {
          if (response.success && response.data) {
            setFoodItems(response.data);
            toast({
              title: "Custom scraping complete",
              description: `Successfully scraped ${response.data.length} food items according to your configuration.`,
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
    handleRefreshData();
  }, [cuisine]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.name || 'Food'} Delivery</h1>
            <p className="text-muted-foreground">
              {foodItems.length} food items found from different restaurants
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
            {showScraperControls && (
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Food Categories
                </h3>
                
                <div className="space-y-2">
                  {foodCategories.map((foodCat) => (
                    <Button 
                      key={foodCat.id}
                      variant={cuisine === foodCat.id ? "default" : "outline"}
                      className="w-full justify-start"
                      asChild
                    >
                      <a href={`/food/${foodCat.id}`}>
                        <span className="mr-2">{foodCat.icon}</span>
                        {foodCat.name}
                      </a>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    asChild
                  >
                    <a href="/food">View All Food</a>
                  </Button>
                </div>
              </div>
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
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price1" />
                      <Label htmlFor="price1">Under $10</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price2" />
                      <Label htmlFor="price2">$10 - $20</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price3" />
                      <Label htmlFor="price3">$20 - $30</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="price4" />
                      <Label htmlFor="price4">$30+</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Food Platforms</h4>
                  <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
                    {foodDeliveryPlatforms.map((platform) => (
                      <div key={platform} className="flex items-center space-x-2">
                        <Checkbox id={`platform-${platform}`} />
                        <Label htmlFor={`platform-${platform}`}>{platform}</Label>
                      </div>
                    ))}
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
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
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
              <h3 className="font-medium text-purple-800 mb-2">Food Delivery Scraping Demo</h3>
              <p className="text-sm text-purple-700">
                This demonstrates how food items could be collected from multiple food delivery platforms using web scraping.
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
                    name="Loading food item..."
                    image="/placeholder.svg"
                    rating={0}
                    reviewCount={0}
                    lowestPrice={0}
                    sources={[{ name: 'Loading...', price: 0, logo: '/placeholder.svg' }]}
                    isLoading={true}
                  />
                ))
              ) : (
                // Show actual food items
                foodItems.map((item) => (
                  <ProductCard key={item.id} {...item} />
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

export default FoodCategoryPage;
