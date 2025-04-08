
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import RatingCircle from './RatingCircle';

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
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{name}</h3>
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-muted-foreground">
              {reviewCount} reviews
            </div>
            <div className="font-semibold">
              {currency}{lowestPrice.toFixed(2)}
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            {sources.slice(0, 3).map((source) => (
              <img 
                key={source.name}
                src={source.logo} 
                alt={source.name} 
                className="source-logo" 
                title={`${source.name}: ${currency}${source.price.toFixed(2)}`}
              />
            ))}
            {sources.length > 3 && (
              <span className="text-xs text-muted-foreground flex items-center">+{sources.length - 3}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
