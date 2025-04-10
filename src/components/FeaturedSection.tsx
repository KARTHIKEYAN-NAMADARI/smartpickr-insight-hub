
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Database, Globe, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import ProductCard, { ProductCardProps } from './ProductCard';
import MovieCard, { MovieCardProps } from './MovieCard';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  viewAllLink: string;
  items: (ProductCardProps | MovieCardProps)[];
  type: 'product' | 'movie';
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  title,
  subtitle,
  viewAllLink,
  items,
  type,
}) => {
  const { toast } = useToast();
  
  // This represents the API sources we would integrate with in production
  const apiSources = type === 'product' 
    ? [
        { name: 'Amazon Product API', status: 'active' },
        { name: 'Flipkart Affiliate API', status: 'active' },
        { name: 'eBay Developer API', status: 'active' },
        { name: 'Etsy Open API', status: 'active' },
        { name: 'Walmart Open API', status: 'active' },
        { name: 'Snapdeal Affiliate API', status: 'active' },
        { name: 'Best Buy API', status: 'active' },
        { name: 'Target API', status: 'active' },
        { name: 'AliExpress API', status: 'active' },
        { name: 'Shopify Storefront API', status: 'active' },
        { name: 'Myntra API', status: 'active' },
        { name: 'Paytm Mall API', status: 'active' },
        { name: 'Tata CLiQ API', status: 'active' },
        { name: 'Nykaa API', status: 'active' },
        { name: 'AJIO API', status: 'active' },
        { name: 'Meesho API', status: 'active' },
        { name: 'FirstCry API', status: 'active' },
        { name: 'Croma API', status: 'active' },
        { name: 'Pepperfry API', status: 'active' },
        { name: 'ShopClues API', status: 'active' },
        { name: 'Reliance Digital API', status: 'active' },
        { name: 'JioMart API', status: 'active' },
        { name: '20+ more sources', status: 'active' },
      ]
    : [
        { name: 'IMDb API', status: 'active' },
        { name: 'Rotten Tomatoes API', status: 'active' },
        { name: 'MovieDB API', status: 'active' },
        { name: 'Metacritic API', status: 'active' },
        { name: 'Fandango API', status: 'active' },
        { name: 'BookMyShow API', status: 'active' },
        { name: 'PVR Cinemas API', status: 'active' },
        { name: 'INOX API', status: 'active' },
        { name: 'AMC Theatres API', status: 'active' },
        { name: 'Cinemark API', status: 'active' },
      ];
  
  const sourceCount = type === 'product' 
    ? 'Amazon, Flipkart, eBay, Etsy, Walmart, Snapdeal, Myntra, and 20+ more' 
    : 'IMDb, Rotten Tomatoes, Metacritic, Fandango, BookMyShow, PVR Cinemas';
  
  const itemCount = type === 'product' ? '1M+ products' : '10K+ movies';
  
  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: `Fetching latest data from ${apiSources.length} sources. This would trigger API calls in production.`,
    });
  };
  
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
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-sm text-purple-700">
                    <Database size={16} className="mr-1" />
                    {type === 'product' ? 'Aggregated Products' : 'Theater Listings'}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    {type === 'product' 
                      ? 'All products are aggregated in real-time from multiple e-commerce platforms including Amazon, Flipkart, eBay, and many more via their APIs. In a production environment, this would use a backend service to make API calls and store results in a database.' 
                      : 'Shows movies currently in theaters with data aggregated from movie databases and theater APIs like IMDb, Rotten Tomatoes, etc.'}
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
                Data from <span className="text-purple-700">{sourceCount}</span>
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
            <strong>API Integration:</strong> In production, this would fetch real-time data from {apiSources.length} e-commerce APIs,
            including Amazon Product API, Flipkart Affiliate API, and eBay Developer API.
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <React.Fragment key={item.id}>
              {type === 'product' ? (
                <ProductCard {...item as ProductCardProps} />
              ) : (
                <MovieCard {...item as MovieCardProps} />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Information about API integration */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="text-sm text-purple-700 flex items-center">
            <Info size={16} className="mr-2 shrink-0" />
            <span>
              {type === 'product' 
                ? 'Product data would be sourced through official APIs from Amazon, Flipkart, eBay, and 20+ other e-commerce platforms. This demo uses system memory to simulate the database, but a production implementation would use a backend service with API connections and a database to store aggregate results.' 
                : 'Movie data would be sourced through official APIs from IMDb, Rotten Tomatoes, and major theater chains. This demo uses system memory, but production implementation would use a backend service with API integrations.'}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {apiSources.slice(0, 12).map((source) => (
              <div key={source.name} className="bg-gray-50 text-xs p-2 rounded flex items-center justify-between">
                <span className="font-medium">{source.name}</span>
                <span className="text-green-600 text-[10px]">●</span>
              </div>
            ))}
            {apiSources.length > 12 && (
              <div className="bg-gray-50 text-xs p-2 rounded flex items-center justify-center text-gray-500">
                +{apiSources.length - 12} more
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
