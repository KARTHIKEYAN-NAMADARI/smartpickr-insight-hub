
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RatingCircle from '@/components/RatingCircle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { detailedProduct } from '@/data/mockData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScraperService } from '@/utils/ScraperService';

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // In a real app, we would fetch the product data based on the ID
  const [product, setProduct] = useState(detailedProduct);
  
  // Simulated scraping operation for product details
  useEffect(() => {
    const scrapeProductDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        toast({
          title: "Scraping product details",
          description: "Simulating web scraping from multiple sources for product details.",
        });
        
        // In a real implementation, this would actually scrape product details
        // For now, we'll just simulate a delay and use mock data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Just use the mock data for now
        setProduct(detailedProduct);
        
        toast({
          title: "Product details ready",
          description: "Successfully collected product details from multiple sources.",
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to scrape product details";
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
    
    scrapeProductDetails();
  }, [id]);
  
  const handleRefreshData = () => {
    toast({
      title: "Refreshing product data",
      description: "Simulating a fresh scrape of product details from all sources.",
    });
    
    setIsLoading(true);
    
    // Simulate a delay for refreshing data
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product data refreshed",
        description: "Successfully updated product details from all sources.",
      });
    }, 1500);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 mx-auto animate-spin text-purple-600 mb-4" />
            <h2 className="text-xl font-medium mb-2">Scraping Product Details</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Collecting and analyzing product information from multiple e-commerce websites...
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={handleRefreshData}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full md:w-2/5">
            <div className="aspect-square bg-white border rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[currentImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square border rounded cursor-pointer overflow-hidden
                    ${idx === currentImage ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img src={image} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 rounded-lg text-sm text-purple-800">
              <h4 className="font-medium mb-1">Price History Tracking</h4>
              <p className="text-xs">
                In a full implementation, this would show historical price data scraped 
                from all sources, allowing you to see price trends over time.
              </p>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-3/5">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1" 
                onClick={handleRefreshData}
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <RatingCircle rating={product.rating} size="sm" />
              <span>{product.reviewCount} reviews</span>
              <span className="text-muted-foreground">• {product.brand}</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Price Comparison</h3>
              <div className="space-y-3">
                {product.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={source.logo} alt={source.name} className="w-6 h-6 object-contain" />
                      <span>{source.name}</span>
                      {!source.inStock && <span className="text-xs text-red-500">Out of stock</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${source.price === product.lowestPrice ? 'text-green-600' : ''}`}>
                        {product.currency}{source.price.toFixed(2)}
                      </span>
                      <Button size="sm" variant={source.inStock ? "default" : "outline"} asChild disabled={!source.inStock}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.inStock ? "Buy" : "Check"}
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-purple-50 p-3 mt-4 rounded-md text-xs text-purple-800">
                <strong>Web Scraping Info:</strong> In a production implementation,
                prices and availability would be scraped in real-time from all supported
                e-commerce websites, ensuring you always get the most current data.
              </div>
            </div>
            
            <Tabs defaultValue="reviews">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(product.reviews).map(([source, review]) => (
                    <div key={source} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium capitalize">{source}</h3>
                        <div className="flex items-center gap-2">
                          <RatingCircle rating={review.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {review.count} reviews
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Highlights:</h4>
                        {review.highlights.map((highlight, idx) => (
                          <div 
                            key={idx} 
                            className={`text-sm p-2 rounded-md ${
                              highlight.sentiment === 'positive' 
                                ? 'bg-green-50 text-green-800' 
                                : 'bg-red-50 text-red-800'
                            }`}
                          >
                            {highlight.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specifications">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specifications.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-muted' : 'bg-white'}>
                          <td className="font-medium p-3 border-r">{spec.name}</td>
                          <td className="p-3">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
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

export default ProductDetail;
