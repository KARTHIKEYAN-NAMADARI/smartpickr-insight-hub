
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FeaturedSection from '@/components/FeaturedSection';
import CategorySection from '@/components/CategorySection';
import RatingCircle from '@/components/RatingCircle';
import { Button } from '@/components/ui/button';
import { Search, Utensils } from 'lucide-react';
import { featuredProducts, featuredMovies, productCategories, movieCategories } from '@/data/mockData';
import AdCarousel from '@/components/AdCarousel';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Compare. Review. Decide.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            SmartPickr aggregates reviews and prices from across the web, helping you make the best purchase decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button className="bg-white text-purple-800 hover:bg-gray-100" asChild>
              <Link to="/category/all-products">Browse Products</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-purple-800" asChild>
              <Link to="/category/movies">Explore Movies</Link>
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl mx-auto">
            {['Amazon', 'Walmart', 'Best Buy', 'IMDb', 'Rotten Tomatoes', 'Metacritic'].map((source) => (
              <div key={source} className="flex flex-col items-center">
                <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                  <span className="text-xs">{source}</span>
                </div>
                <span className="text-xs font-medium">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Best Offers Carousel */}
      <AdCarousel />
      
      {/* Featured Products Section */}
      <FeaturedSection 
        title="Top Products" 
        subtitle="Highest-rated products across all categories"
        viewAllLink="/category/all-products"
        items={featuredProducts}
        type="product"
      />
      
      {/* Food Category Section - New */}
      <section className="py-8 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Utensils className="h-6 w-6 mr-2 text-amber-600" />
                Food Delivery Comparison
              </h2>
              <p className="text-muted-foreground">Compare restaurant food prices across delivery platforms</p>
            </div>
            <Button asChild variant="default" className="bg-amber-600 hover:bg-amber-700">
              <Link to="/food">
                Explore Food
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Indian', 'Italian', 'American', 'Chinese'].map((cuisine) => (
              <Link 
                key={cuisine} 
                to={`/food/${cuisine.toLowerCase()}`}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 text-center"
              >
                <h3 className="font-semibold text-lg mb-1">{cuisine}</h3>
                <p className="text-sm text-gray-500">Compare prices from multiple delivery apps</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-sm text-center text-amber-700">
            Compare food prices from Swiggy, Zomato, UberEats, DoorDash, and more!
          </div>
        </div>
      </section>
      
      {/* Best Sellers Section */}
      <FeaturedSection 
        title="Best Sellers" 
        subtitle="Most popular products with highest sales"
        viewAllLink="/category/best-sellers"
        items={featuredProducts.slice(0, 5)}
        type="product"
      />
      
      {/* Product Categories */}
      <CategorySection 
        title="Product Categories" 
        categories={productCategories}
      />
      
      {/* Featured Movies Section */}
      <FeaturedSection 
        title="Top Movies" 
        subtitle="Latest and highest-rated movies"
        viewAllLink="/category/movies"
        items={featuredMovies}
        type="movie"
      />
      
      {/* Movie Categories */}
      <CategorySection 
        title="Movie Categories" 
        categories={movieCategories}
      />
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How SmartPickr Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Aggregate Reviews</h3>
              <p className="text-muted-foreground">We collect reviews and ratings from multiple trusted sources across the web.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Compare Prices</h3>
              <p className="text-muted-foreground">Get real-time price comparisons from major retailers to find the best deals.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Smart Choices</h3>
              <p className="text-muted-foreground">Use our analysis and summaries to make informed purchase decisions quickly.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8 max-w-md mx-auto">Get the latest product reviews, price drops, and movie releases delivered to your inbox.</p>
          
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-navy text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SmartPickr</h3>
              <p className="text-gray-300">Your trusted source for product, food, and movie reviews, comparisons, and real-time prices.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/category/electronics" className="text-gray-300 hover:text-white">Electronics</Link></li>
                <li><Link to="/category/home-appliances" className="text-gray-300 hover:text-white">Home Appliances</Link></li>
                <li><Link to="/category/fashion" className="text-gray-300 hover:text-white">Fashion</Link></li>
                <li><Link to="/category/beauty" className="text-gray-300 hover:text-white">Beauty</Link></li>
                <li><Link to="/category/best-sellers" className="text-gray-300 hover:text-white">Best Sellers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Entertainment</h4>
              <ul className="space-y-2">
                <li><Link to="/food" className="text-gray-300 hover:text-white">Food Delivery</Link></li>
                <li><Link to="/category/action" className="text-gray-300 hover:text-white">Action Movies</Link></li>
                <li><Link to="/category/comedy" className="text-gray-300 hover:text-white">Comedy Movies</Link></li>
                <li><Link to="/category/drama" className="text-gray-300 hover:text-white">Drama Movies</Link></li>
                <li><Link to="/category/sci-fi" className="text-gray-300 hover:text-white">Sci-Fi Movies</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SmartPickr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
