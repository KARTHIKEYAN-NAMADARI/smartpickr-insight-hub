
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
import { ExternalLink } from 'lucide-react';

// Mock data for best offers
const bestOffers = [
  {
    id: 1,
    title: "50% OFF on Electronics",
    description: "Limited time offer on all electronics at Amazon",
    store: "Amazon",
    image: "https://placehold.co/600x300/purple/white?text=Amazon+Deal",
    url: "https://amazon.com"
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    description: "Special weekend offer on clothing at Flipkart",
    store: "Flipkart",
    image: "https://placehold.co/600x300/blue/white?text=Flipkart+Offer",
    url: "https://flipkart.com"
  },
  {
    id: 3,
    title: "Clearance Sale",
    description: "Up to 70% off on home appliances at Walmart",
    store: "Walmart",
    image: "https://placehold.co/600x300/yellow/black?text=Walmart+Sale",
    url: "https://walmart.com"
  },
  {
    id: 4,
    title: "Season End Sale",
    description: "Massive discounts on fashion items at Myntra",
    store: "Myntra",
    image: "https://placehold.co/600x300/pink/white?text=Myntra+Sale",
    url: "https://myntra.com"
  },
  {
    id: 5,
    title: "Tech Week Special",
    description: "Special discounts on smartphones at Best Buy",
    store: "Best Buy",
    image: "https://placehold.co/600x300/navy/white?text=Best+Buy+Tech+Week",
    url: "https://bestbuy.com"
  }
];

const AdCarousel = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Best Offers From Top Stores</h2>
        
        <Carousel className="w-full">
          <CarouselContent>
            {bestOffers.map((offer) => (
              <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="overflow-hidden h-full border-2 border-purple-100 hover:border-purple-300 transition-all">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{offer.title}</h3>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {offer.store}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                      {offer.description}
                    </p>
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
      </div>
    </section>
  );
};

export default AdCarousel;
