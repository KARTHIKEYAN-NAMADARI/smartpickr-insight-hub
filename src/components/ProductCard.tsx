
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import RatingCircle from './RatingCircle';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger,
  TooltipProvider as Provider
} from "@/components/ui/tooltip";
import { Tag, ShoppingCart, TrendingUp, BarChart3 } from 'lucide-react';

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
  
  // Calculate price difference percentage from highest to lowest
  const highestPrice = Math.max(...sources.map(s => s.price));
  const savingsPercentage = Math.round(((highestPrice - lowestPrice) / highestPrice) * 100);
  
  // Get price history data (this would come from API in production)
  const hasPriceHistory = true;
  const isPriceDropping = Math.random() > 0.5;
  
  return (
    <Link to={`/product/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full">
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
              <div className="flex justify-between items-center">
                <span className="text-white text-xs font-medium">
                  <ShoppingCart className="h-3 w-3 inline mr-1" />
                  {sortedSources.length} stores
                </span>
                {savingsPercentage > 0 && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Save {savingsPercentage}%
                  </span>
                )}
              </div>
            </div>
          )}
          
          {hasPriceHistory && (
            <div className="absolute top-2 left-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`${isPriceDropping ? 'bg-green-600' : 'bg-orange-500'} text-white p-1 rounded-full`}>
                      <BarChart3 className="h-3 w-3" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="text-xs">
                      {isPriceDropping 
                        ? 'Price trend: Dropping (good time to buy)' 
                        : 'Price trend: Rising (consider waiting)'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
            <Provider>
              {sortedSources.slice(0, 3).map((source) => (
                <Tooltip key={source.name}>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <img 
                        src={source.logo} 
                        alt={source.name} 
                        className="w-6 h-6 object-contain" 
                      />
                      {source.price === lowestPrice && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p className="flex items-center gap-1">
                      {source.name}: 
                      <span className={source.price === lowestPrice ? "text-green-600 font-bold" : ""}>
                        {currency}{source.price.toFixed(2)}
                      </span>
                      {source.price === lowestPrice && <Tag className="h-3 w-3 text-green-600" />}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </Provider>
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
                      <p key={source.name} className="text-xs flex items-center gap-1">
                        {source.name}: 
                        <span className={source.price === lowestPrice ? "text-green-600 font-bold" : ""}>
                          {currency}{source.price.toFixed(2)}
                        </span>
                        {source.price === lowestPrice && <Tag className="h-3 w-3 text-green-600" />}
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
