
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import RatingCircle from './RatingCircle';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

export interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  lowestPrice: number;
  currency?: string;
  sources: {
    name: string;
    price: number;
    logo: string;
  }[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  rating,
  reviewCount,
  lowestPrice,
  currency = "$",
  sources,
}) => {
  // Sort sources by price (lowest first)
  const sortedSources = [...sources].sort((a, b) => a.price - b.price);
  
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <RatingCircle rating={rating} size="sm" />
          </div>
          {sortedSources.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <span className="text-white text-xs font-medium">
                Available at {sortedSources.length} stores
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{name}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-muted-foreground">
              {reviewCount} reviews
            </div>
            <div className="font-semibold text-green-600">
              {currency}{lowestPrice.toFixed(2)}
            </div>
          </div>
          <div className="mt-2 flex gap-1 flex-wrap">
            <TooltipProvider>
              {sortedSources.slice(0, 3).map((source) => (
                <Tooltip key={source.name}>
                  <TooltipTrigger asChild>
                    <img 
                      src={source.logo} 
                      alt={source.name} 
                      className="w-6 h-6 object-contain" 
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{source.name}: {currency}{source.price.toFixed(2)}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
            {sortedSources.length > 3 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-xs bg-gray-100 rounded-full w-6 h-6 flex items-center justify-center">
                    +{sortedSources.length - 3}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-1">
                    {sortedSources.slice(3).map((source) => (
                      <p key={source.name} className="text-xs">
                        {source.name}: {currency}{source.price.toFixed(2)}
                      </p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
