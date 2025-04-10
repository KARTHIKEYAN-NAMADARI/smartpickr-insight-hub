
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScraperService } from '@/utils/ScraperService';
import ProductCard, { ProductCardProps } from '@/components/ProductCard';
import ScraperControls, { ScraperOptions } from '@/components/ScraperControls';
import { useToast } from '@/hooks/use-toast';
import { Package, RefreshCw, Clock, Search } from 'lucide-react';

const QuickCommercePage = () => {
  const { category } = useParams<{ category?: string }>();
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(category || 'all');
  
  const categories = [
    'All',
    'Groceries',
    'Fresh Vegetables',
    'Fresh Fruits',
    'Dairy',
    'Bakery',
    'Beverages',
    'Snacks',
    'Household',
    'Personal Care',
    'Baby Products',
  ];

  useEffect(() => {
    fetchProducts(selectedTab.toLowerCase());
  }, [selectedTab]);
  
  const fetchProducts = async (cat: string) => {
    setIsLoading(true);
    try {
      const response = await ScraperService.scrapeQuickCommerceProducts(cat === 'all' ? undefined : cat);
      if (response.success && response.data) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to fetch products",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);
  
  const handleClearCache = () => {
    ScraperService.clearCache();
    toast({
      title: "Cache Cleared",
      description: "The product cache has been cleared",
    });
    fetchProducts(selectedTab.toLowerCase());
  };
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setSearchQuery('');
  };
  
  const handleScraperStart = (options: ScraperOptions) => {
    toast({
      title: "Starting Scraper",
      description: `Scraping ${options.category} products from ${options.sites.length} sites`,
    });
    fetchProducts(options.category.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Main Content */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Package className="h-8 w-8 mr-2 text-emerald-500" />
                  Quick Commerce Products
                </h1>
                <p className="text-gray-500 mt-1">
                  Compare prices across Instamart, Zepto, Blinkit, and more
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCache}
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
            
            <div className="w-full flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search quick commerce products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <Tabs value={selectedTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start pb-1 mb-4">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat === 'All' ? 'all' : cat}
                    className="whitespace-nowrap"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map((cat) => (
                <TabsContent 
                  key={cat} 
                  value={cat === 'All' ? 'all' : cat}
                  className="m-0"
                >
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-white border rounded-lg p-4 h-60 animate-pulse"
                        >
                          <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          {...product}
                          className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          showDeliveryTime={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-500">No products found</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => fetchProducts(selectedTab.toLowerCase())}
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <ScraperControls 
              onStartScraping={handleScraperStart}
              isLoading={isLoading}
            />
            
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-emerald-500" />
                Quick Commerce Delivery Times
              </h3>
              <div className="space-y-3">
                {ScraperService.quickCommercePlatforms.map((platform) => (
                  <div key={platform.name} className="flex justify-between">
                    <span>{platform.name}</span>
                    <span className="text-sm font-medium text-emerald-600">
                      {`${5 + Math.floor(Math.random() * 25)} mins`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickCommercePage;
