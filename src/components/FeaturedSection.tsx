
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
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
          <Button asChild variant="ghost" className="gap-1">
            <Link to={viewAllLink}>
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
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
      </div>
    </section>
  );
};

export default FeaturedSection;
