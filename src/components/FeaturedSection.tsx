
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info, Database, Globe } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  // This would be replaced with a real data fetching mechanism in production
  const sourceCount = type === 'product' 
    ? 'Amazon, Flipkart, Snapdeal, Etsy, Myntra, eBay, and 20+ more' 
    : 'IMDb, Rotten Tomatoes, Metacritic, Fandango, BookMyShow, PVR Cinemas';
  
  const itemCount = type === 'product' ? '1M+ products' : '10K+ movies';
  
  return (
    <section className="py-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-4">
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
                      ? 'All products are aggregated in real-time from multiple e-commerce platforms including Amazon, Flipkart, Snapdeal, Etsy, and many more.' 
                      : 'Shows movies currently in theaters with data aggregated from movie databases and theater APIs.'}
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
        
        {/* Information about data integration */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="text-sm text-purple-700 flex items-center">
            <Info size={16} className="mr-2" />
            <span>
              {type === 'product' 
                ? 'Products shown here are continuously updated from our aggregated database of 20+ e-commerce platforms. System memory is used for demo purposes, but a scalable database would be implemented in production.' 
                : 'Movies shown here are updated based on current theater listings aggregated from multiple cinema APIs and websites. The system memory is used for demonstration, with real-time data integration in production.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
