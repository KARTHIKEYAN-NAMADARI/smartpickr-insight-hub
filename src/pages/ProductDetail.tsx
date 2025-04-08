
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import RatingCircle from '@/components/RatingCircle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { detailedProduct } from '@/data/mockData';

const ProductDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  
  // In a real app, we would fetch the product data based on the ID
  const product = detailedProduct;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full md:w-2/5">
            <div className="aspect-square bg-white border rounded-lg overflow-hidden mb-4">
              <img 
                src={product.images[currentImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, idx) => (
                <div 
                  key={idx}
                  className={`aspect-square border rounded cursor-pointer overflow-hidden
                    ${idx === currentImage ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setCurrentImage(idx)}
                >
                  <img src={image} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <RatingCircle rating={product.rating} size="sm" />
              <span>{product.reviewCount} reviews</span>
              <span className="text-muted-foreground">• {product.brand}</span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Price Comparison</h3>
              <div className="space-y-3">
                {product.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={source.logo} alt={source.name} className="w-6 h-6 object-contain" />
                      <span>{source.name}</span>
                      {!source.inStock && <span className="text-xs text-red-500">Out of stock</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${source.price === product.lowestPrice ? 'text-green-600' : ''}`}>
                        {product.currency}{source.price.toFixed(2)}
                      </span>
                      <Button size="sm" variant={source.inStock ? "default" : "outline"} asChild disabled={!source.inStock}>
                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                          {source.inStock ? "Buy" : "Check"}
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Tabs defaultValue="reviews">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(product.reviews).map(([source, review]) => (
                    <div key={source} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium capitalize">{source}</h3>
                        <div className="flex items-center gap-2">
                          <RatingCircle rating={review.rating} size="sm" />
                          <span className="text-sm text-muted-foreground">
                            {review.count} reviews
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Highlights:</h4>
                        {review.highlights.map((highlight, idx) => (
                          <div 
                            key={idx} 
                            className={`text-sm p-2 rounded-md ${
                              highlight.sentiment === 'positive' 
                                ? 'bg-green-50 text-green-800' 
                                : 'bg-red-50 text-red-800'
                            }`}
                          >
                            {highlight.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="specifications">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {product.specifications.map((spec, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-muted' : 'bg-white'}>
                          <td className="font-medium p-3 border-r">{spec.name}</td>
                          <td className="p-3">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
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

export default ProductDetail;
