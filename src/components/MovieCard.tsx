
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import RatingCircle from './RatingCircle';

export interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  year: number;
  rating: number;
  reviewCount: number;
  sources: {
    name: string;
    rating: number;
    logo: string;
  }[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster,
  year,
  rating,
  reviewCount,
  sources,
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-[2/3] overflow-hidden relative">
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <RatingCircle rating={rating} size="sm" />
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <div className="text-xs text-muted-foreground mb-2">{year}</div>
          <div className="text-xs text-muted-foreground">
            {reviewCount} reviews
          </div>
          <div className="mt-2 flex gap-1">
            {sources.slice(0, 3).map((source) => (
              <img 
                key={source.name}
                src={source.logo} 
                alt={source.name} 
                className="source-logo" 
                title={`${source.name}: ${source.rating.toFixed(1)}/10`}
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

export default MovieCard;
