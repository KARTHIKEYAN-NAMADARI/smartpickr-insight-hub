
import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for best offers from e-commerce platforms
const bestOffers = [
  {
    id: 1,
    title: "50% OFF on Electronics",
    description: "Limited time offer on all electronics at Amazon",
    store: "Amazon",
    image: "https://placehold.co/600x300/purple/white?text=Amazon+Deal",
    url: "https://amazon.com",
    price: "$299",
    originalPrice: "$599"
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    description: "Special weekend offer on clothing at Flipkart",
    store: "Flipkart",
    image: "https://placehold.co/600x300/blue/white?text=Flipkart+Offer",
    url: "https://flipkart.com",
    price: "$49.99",
    originalPrice: "$99.98"
  },
  {
    id: 3,
    title: "Clearance Sale",
    description: "Up to 70% off on home appliances at Walmart",
    store: "Walmart",
    image: "https://placehold.co/600x300/yellow/black?text=Walmart+Sale",
    url: "https://walmart.com",
    price: "$129",
    originalPrice: "$429"
  },
  {
    id: 4,
    title: "Season End Sale",
    description: "Massive discounts on fashion items at Myntra",
    store: "Myntra",
    image: "https://placehold.co/600x300/pink/white?text=Myntra+Sale",
    url: "https://myntra.com",
    price: "$24.99",
    originalPrice: "$79.99"
  },
  {
    id: 5,
    title: "Tech Week Special",
    description: "Special discounts on smartphones at Best Buy",
    store: "Best Buy",
    image: "https://placehold.co/600x300/navy/white?text=Best+Buy+Tech+Week",
    url: "https://bestbuy.com",
    price: "$599",
    originalPrice: "$899"
  },
  {
    id: 6,
    title: "Fashion Flash Sale",
    description: "24-hour flash sale on premium brands at Snapdeal",
    store: "Snapdeal",
    image: "https://placehold.co/600x300/red/white?text=Snapdeal+Flash+Sale",
    url: "https://snapdeal.com",
    price: "$39.99",
    originalPrice: "$119.99"
  },
  {
    id: 7,
    title: "Home Decor Bonanza",
    description: "Special offers on home decor items at Etsy",
    store: "Etsy",
    image: "https://placehold.co/600x300/green/white?text=Etsy+Home+Decor",
    url: "https://etsy.com",
    price: "$79",
    originalPrice: "$149"
  },
  {
    id: 8,
    title: "Mega Electronics Sale",
    description: "Limited period discounts on gadgets at Newegg",
    store: "Newegg",
    image: "https://placehold.co/600x300/orange/white?text=Newegg+Electronics",
    url: "https://newegg.com",
    price: "$449",
    originalPrice: "$799"
  }
];

// Mock data for movies currently in theaters
const theaterMovies = [
  {
    id: 1,
    title: "Galactic Odyssey",
    description: "An epic space adventure showing in IMAX theaters nationwide",
    theater: "AMC Theaters",
    image: "https://placehold.co/600x300/purple/white?text=Galactic+Odyssey",
    url: "https://amc.com/tickets",
    rating: "9.2/10",
    showtime: "Now Showing"
  },
  {
    id: 2,
    title: "The Last Stand",
    description: "Action-packed thriller with premiere discounts this weekend",
    theater: "Regal Cinemas",
    image: "https://placehold.co/600x300/navy/white?text=The+Last+Stand",
    url: "https://regmovies.com",
    rating: "8.7/10",
    showtime: "Now Showing"
  },
  {
    id: 3,
    title: "Whispers in the Dark",
    description: "Horror film with special midnight screenings",
    theater: "Cinemark",
    image: "https://placehold.co/600x300/black/white?text=Whispers+in+the+Dark",
    url: "https://cinemark.com",
    rating: "8.4/10",
    showtime: "Limited Release"
  },
  {
    id: 4,
    title: "Love in Paris",
    description: "Romantic comedy with couple's ticket offers",
    theater: "INOX",
    image: "https://placehold.co/600x300/pink/white?text=Love+in+Paris",
    url: "https://inoxmovies.com",
    rating: "8.9/10",
    showtime: "Now Showing"
  },
  {
    id: 5,
    title: "Detective Chronicles",
    description: "Mystery thriller with early bird ticket discounts",
    theater: "PVR Cinemas",
    image: "https://placehold.co/600x300/blue/white?text=Detective+Chronicles",
    url: "https://pvrcinemas.com",
    rating: "9.1/10",
    showtime: "Advance Booking"
  }
];

const AdCarousel = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Best Deals & New Releases</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-purple-700">
                  <Info size={16} className="mr-1" />
                  Live Data Integration
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  In production, this section would display real-time data from multiple e-commerce 
                  platforms and movie theaters via API integrations and database aggregation.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Tabs defaultValue="offers" className="w-full mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="offers">Top E-commerce Offers</TabsTrigger>
            <TabsTrigger value="movies">Movies in Theaters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="offers">
            <Carousel className="w-full">
              <CarouselContent>
                {bestOffers.map((offer) => (
                  <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="overflow-hidden h-full border-2 border-purple-100 hover:border-purple-300 transition-all">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img 
                          src={offer.image} 
                          alt={offer.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                          SALE
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{offer.title}</h3>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            {offer.store}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {offer.description}
                        </p>
                        <div className="flex items-center mb-4">
                          <span className="font-bold text-lg text-green-600">{offer.price}</span>
                          <span className="ml-2 text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
                        </div>
                        <Button className="w-full" variant="outline" asChild>
                          <a href={offer.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            View Offer <ExternalLink size={16} />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative inset-auto mr-2" />
                <CarouselNext className="relative inset-auto ml-2" />
              </div>
            </Carousel>
          </TabsContent>
          
          <TabsContent value="movies">
            <Carousel className="w-full">
              <CarouselContent>
                {theaterMovies.map((movie) => (
                  <CarouselItem key={movie.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="overflow-hidden h-full border-2 border-purple-100 hover:border-purple-300 transition-all">
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img 
                          src={movie.image} 
                          alt={movie.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-bold">
                          {movie.showtime}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg">{movie.title}</h3>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {movie.theater}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {movie.description}
                        </p>
                        <div className="flex items-center mb-4">
                          <span className="font-bold text-sm">Rating: {movie.rating}</span>
                        </div>
                        <Button className="w-full" variant="outline" asChild>
                          <a href={movie.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                            Book Tickets <ExternalLink size={16} />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative inset-auto mr-2" />
                <CarouselNext className="relative inset-auto ml-2" />
              </div>
            </Carousel>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-md p-4">
          <h3 className="font-medium text-purple-800 mb-2">Data Integration Information</h3>
          <p className="text-sm text-purple-700">
            In a production environment, this component would connect to a backend service that aggregates data from:
            <ul className="list-disc pl-5 mt-2">
              <li>Multiple e-commerce platforms (Amazon, Flipkart, Snapdeal, Etsy, etc.) via their APIs</li>
              <li>Movie ticketing platforms and theater chains for current showings</li>
              <li>A database storing historical price data and availability information</li>
            </ul>
            The data would update in real-time to show the latest offers and movie releases.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdCarousel;
