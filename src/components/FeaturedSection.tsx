
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
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
                    <Info size={16} className="mr-1" />
                    {type === 'product' ? 'Aggregated Products' : 'Theater Listings'}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    {type === 'product' 
                      ? 'In a production environment, this would display real products aggregated from multiple e-commerce platforms.' 
                      : 'This would show movies currently in theaters with real-time ticket availability.'}
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
                ? 'Products shown here would be updated in real-time from our database of aggregated e-commerce listings.' 
                : 'Movies shown here would be updated based on current theater releases and availability.'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
