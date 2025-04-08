
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RatingCircle from '@/components/RatingCircle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { detailedMovie } from '@/data/mockData';

const MovieDetail = () => {
  const { id } = useParams();
  
  // In a real app, we would fetch the movie data based on the ID
  const movie = detailedMovie;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Movie Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[50vh]" 
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="hidden md:block w-48 h-72 rounded-lg overflow-hidden shadow-lg">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title} ({movie.year})</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map(genre => (
                  <Badge key={genre} variant="outline" className="text-white border-white">
                    {genre}
                  </Badge>
                ))}
                <span className="text-sm">{movie.runtime} min</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <RatingCircle rating={movie.rating} size="md" />
                  <div>
                    <div className="font-semibold">{movie.rating.toFixed(1)}/10</div>
                    <div className="text-xs text-gray-300">{movie.reviewCount} reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Poster - Only visible on mobile */}
      <div className="md:hidden -mt-16 px-4 mb-6">
        <div className="w-32 h-48 rounded-lg overflow-hidden shadow-lg mx-auto">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="text-gray-700">{movie.plot}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Director</span>
                  <div className="font-medium">{movie.director}</div>
                </div>
                
                {movie.cast.map((actor, idx) => (
                  <div key={idx}>
                    <span className="text-sm text-muted-foreground">Actor</span>
                    <div className="font-medium">{actor}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="critic-reviews">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="critic-reviews">Critic Reviews</TabsTrigger>
                <TabsTrigger value="audience-reviews">Audience Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="critic-reviews" className="space-y-4">
                {movie.reviews.critics.map((review, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium">{review.author}</span>
                        <span className="text-sm text-muted-foreground"> • {review.publication}</span>
                      </div>
                      <RatingCircle rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-700">{review.content}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="audience-reviews" className="space-y-4">
                {movie.reviews.audience.map((review, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{review.username}</span>
                      <RatingCircle rating={review.rating} size="sm" />
                    </div>
                    <p className="text-sm text-gray-700">{review.content}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full lg:w-1/3">
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">Ratings Comparison</h3>
              <div className="space-y-4">
                {movie.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={source.logo} alt={source.name} className="w-6 h-6 object-contain" />
                      <span>{source.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <RatingCircle rating={source.rating} size="sm" />
                      <span className="text-sm text-muted-foreground">
                        ({source.reviewCount})
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Where to Watch</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Check streaming availability
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Availability data is updated daily
                </p>
              </div>
            </div>
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

export default MovieDetail;
