
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import MovieCard from '@/components/MovieCard';
import { featuredProducts, featuredMovies, productCategories, movieCategories } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { id } = useParams();
  
  // Determine if we're showing products or movies based on the category ID
  const isMovie = id === 'movies' || movieCategories.some(cat => cat.id === id);
  
  // Find the category details
  const category = isMovie 
    ? id === 'movies' 
      ? { name: 'All Movies', count: featuredMovies.length } 
      : movieCategories.find(cat => cat.id === id)
    : id === 'all-products' 
      ? { name: 'All Products', count: featuredProducts.length }
      : productCategories.find(cat => cat.id === id);
  
  // Items to display based on category
  // In a real app, we would fetch based on the category ID
  const items = isMovie ? featuredMovies : featuredProducts;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category?.name || 'Category'}</h1>
          <p className="text-muted-foreground">
            {category?.count || 0} {isMovie ? 'movies' : 'products'} found
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 bg-card rounded-lg p-4 h-fit">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Rating</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <span>4+ Stars</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <span>3+ Stars</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <span>2+ Stars</span>
                  </label>
                </div>
              </div>
              
              {!isMovie && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>Under $100</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>$100 - $300</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>$300 - $500</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                      <span>$500+</span>
                    </label>
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium mb-2">Sources</h4>
                <div className="space-y-1">
                  {isMovie ? (
                    <>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>IMDb</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>Rotten Tomatoes</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>Metacritic</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>Amazon</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>Best Buy</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                        <span>Walmart</span>
                      </label>
                    </>
                  )}
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <select className="border rounded p-1 text-sm">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  {!isMovie && <option>Price: Low to High</option>}
                  {!isMovie && <option>Price: High to Low</option>}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">View:</span>
                <button className="p-1 rounded bg-muted">Grid</button>
                <button className="p-1 rounded">List</button>
              </div>
            </div>
            
            {/* Grid View */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  {isMovie ? (
                    <MovieCard {...item} />
                  ) : (
                    <ProductCard {...item} />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex">
                <Button variant="outline" size="sm" className="rounded-r-none">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0 bg-muted">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="rounded-none border-l-0">
                  3
                </Button>
                <Button variant="outline" size="sm" className="rounded-l-none border-l-0">
                  Next
                </Button>
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

export default CategoryPage;
