
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Database, Globe, RefreshCw, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import ProductCard, { ProductCardProps } from './ProductCard';
import MovieCard, { MovieCardProps } from './MovieCard';
import { ScraperService } from '@/utils/ScraperService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink: string;
  items: (ProductCardProps | MovieCardProps)[];
  type: 'product' | 'movie';
  category?: string;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  viewAllLink,
  items: initialItems,
  type,
  category = 'all',
}) => {
  const { toast } = useToast();
  const [items, setItems] = useState<(ProductCardProps | MovieCardProps)[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // This represents websites we would scrape in production
  const websites = type === 'product' 
    ? ScraperService.supportedSites
    : [
        { name: 'IMDb', url: 'https://www.imdb.com', logo: '/placeholder.svg' },
        { name: 'Rotten Tomatoes', url: 'https://www.rottentomatoes.com', logo: '/placeholder.svg' },
        { name: 'Metacritic', url: 'https://www.metacritic.com', logo: '/placeholder.svg' },
        { name: 'Fandango', url: 'https://www.fandango.com', logo: '/placeholder.svg' },
        { name: 'BookMyShow', url: 'https://in.bookmyshow.com', logo: '/placeholder.svg' },
        { name: 'PVR Cinemas', url: 'https://www.pvrcinemas.com', logo: '/placeholder.svg' },
        { name: 'INOX', url: 'https://www.inoxmovies.com', logo: '/placeholder.svg' },
        { name: 'AMC Theatres', url: 'https://www.amctheatres.com', logo: '/placeholder.svg' },
      ];
  
  const websiteCount = type === 'product' 
    ? 'Amazon, Flipkart, eBay, Etsy, Walmart, and more'
    : 'IMDb, Rotten Tomatoes, Metacritic, and theater chains';
  
  const itemCount = type === 'product' ? '1M+ products' : '10K+ movies';
  
  const handleRefreshData = async () => {
    if (type !== 'product') {
      toast({
        title: "Movie scraping not implemented",
        description: "This demo only includes product scraping. Movie data would be similarly scraped in a full implementation.",
      });
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      toast({
        title: "Starting web scraping",
        description: `Simulating scraping from ${websites.length} e-commerce websites for ${category} products.`,
      });
      
      // Clear the cache to force a fresh "scrape"
      ScraperService.clearCache();
      
      // Use our scraper service
      const response = await ScraperService.scrapeProducts(category);
      
      if (response.success && response.data) {
        setItems(response.data);
        toast({
          title: "Scraping complete",
          description: `Successfully scraped ${response.data.length} products from ${websites.length} sources.`,
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
  
  // Automatically run the "scraper" when the component mounts
  useEffect(() => {
    if (type === 'product') {
      handleRefreshData();
    }
  }, [category]);
  
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 text-purple-700" 
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Scraping...' : 'Refresh Data'}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-purple-700">
                    <Database size={16} className="mr-1" />
                    {type === 'product' ? 'Web Scraping Demo' : 'Theater Listings'}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    {type === 'product' 
                      ? 'This is a simulation of web scraping from e-commerce sites. In a production environment, this would use actual web scraping libraries to extract product data from multiple sources.' 
                      : 'In a production environment, this would scrape movie data from review sites and theater listings.'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button asChild variant="ghost" className="gap-1">
              <Link to={viewAllLink}>
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-700" />
              <span className="text-sm font-medium">
                Data from <span className="text-purple-700">{websiteCount}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-700" />
              <span className="text-sm font-medium">
                <span className="text-purple-700">{itemCount}</span> in database
              </span>
            </div>
          </div>
          <div className="mt-3 text-xs text-purple-700 border-t border-purple-100 pt-3">
            <strong>Web Scraping Demo:</strong> This demonstrates how data could be scraped from {websites.length} e-commerce websites.
            In a production environment, this would use libraries like Cheerio, Puppeteer or Playwright to extract real product data.
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {isLoading ? (
            // Show loading placeholders
            Array.from({ length: 10 }).map((_, index) => (
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
                {type === 'product' ? (
                  <ProductCard {...item as ProductCardProps} />
                ) : (
                  <MovieCard {...item as MovieCardProps} />
                )}
              </React.Fragment>
            ))
          )}
        </div>
        
        {/* Information about web scraping */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="text-sm text-purple-700 flex items-center">
            <Info size={16} className="mr-2 shrink-0" />
            <span>
              {type === 'product' 
                ? 'This demo simulates web scraping from e-commerce websites. In a real implementation, you would need to consider rate limiting, IP rotation, legal implications, and website terms of service. Some websites explicitly prohibit scraping.' 
                : 'Movie data would be scraped from review sites and theater chains. Always check terms of service before implementing web scraping in production.'}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {websites.slice(0, 12).map((site) => (
              <div key={site.name} className="bg-gray-50 text-xs p-2 rounded flex items-center justify-between">
                <span className="font-medium">{site.name}</span>
                <span className="text-green-600 text-[10px]">●</span>
              </div>
            ))}
            {websites.length > 12 && (
              <div className="bg-gray-50 text-xs p-2 rounded flex items-center justify-center text-gray-500">
                +{websites.length - 12} more
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
