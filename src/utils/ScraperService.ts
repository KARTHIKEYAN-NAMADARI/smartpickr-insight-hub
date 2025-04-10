import { ProductCardProps } from '../components/ProductCard';

// This is a simulation of a web scraper service
// In a real implementation, this would use libraries like axios and cheerio/jsdom
// to fetch and parse HTML from e-commerce websites

interface ScraperResponse {
  success: boolean;
  data?: ProductCardProps[];
  error?: string;
}

export class ScraperService {
  // Cache for scraped data to avoid multiple scrapes
  private static cache: Record<string, ProductCardProps[]> = {};
  
  // List of supported e-commerce sites
  static supportedSites = [
    { name: 'Amazon', url: 'https://www.amazon.com', logo: '/placeholder.svg' },
    { name: 'Flipkart', url: 'https://www.flipkart.com', logo: '/placeholder.svg' },
    { name: 'eBay', url: 'https://www.ebay.com', logo: '/placeholder.svg' },
    { name: 'Etsy', url: 'https://www.etsy.com', logo: '/placeholder.svg' },
    { name: 'Walmart', url: 'https://www.walmart.com', logo: '/placeholder.svg' },
    { name: 'Snapdeal', url: 'https://www.snapdeal.com', logo: '/placeholder.svg' },
    { name: 'Best Buy', url: 'https://www.bestbuy.com', logo: '/placeholder.svg' },
    { name: 'Target', url: 'https://www.target.com', logo: '/placeholder.svg' },
    { name: 'AliExpress', url: 'https://www.aliexpress.com', logo: '/placeholder.svg' },
    { name: 'Myntra', url: 'https://www.myntra.com', logo: '/placeholder.svg' },
  ];
  
  // List of supported food delivery platforms
  static foodDeliveryPlatforms = [
    { name: 'Swiggy', url: 'https://www.swiggy.com', logo: '/placeholder.svg' },
    { name: 'Zomato', url: 'https://www.zomato.com', logo: '/placeholder.svg' },
    { name: 'UberEats', url: 'https://www.ubereats.com', logo: '/placeholder.svg' },
    { name: 'DoorDash', url: 'https://www.doordash.com', logo: '/placeholder.svg' },
    { name: 'GrubHub', url: 'https://www.grubhub.com', logo: '/placeholder.svg' },
    { name: 'Deliveroo', url: 'https://www.deliveroo.com', logo: '/placeholder.svg' },
    { name: 'Foodpanda', url: 'https://www.foodpanda.com', logo: '/placeholder.svg' },
    { name: 'Just Eat', url: 'https://www.just-eat.com', logo: '/placeholder.svg' },
  ];
  
  // List of supported quick commerce platforms
  static quickCommercePlatforms = [
    { name: 'Instamart', url: 'https://www.swiggy.com/instamart', logo: '/placeholder.svg' },
    { name: 'Zepto', url: 'https://www.zeptonow.com', logo: '/placeholder.svg' },
    { name: 'Blinkit', url: 'https://blinkit.com', logo: '/placeholder.svg' },
    { name: 'BigBasket', url: 'https://www.bigbasket.com', logo: '/placeholder.svg' },
    { name: 'Dunzo', url: 'https://www.dunzo.com', logo: '/placeholder.svg' },
    { name: 'JioMart Express', url: 'https://www.jiomart.com', logo: '/placeholder.svg' },
    { name: 'Flipkart Quick', url: 'https://www.flipkart.com/quick', logo: '/placeholder.svg' },
    { name: 'Amazon Fresh', url: 'https://www.amazon.com/fresh', logo: '/placeholder.svg' },
  ];

  static async scrapeProducts(category: string): Promise<ScraperResponse> {
    try {
      console.log(`Scraping products for category: ${category}`);
      
      // Check if we have cached data
      if (this.cache[category]) {
        console.log(`Using cached data for ${category}`);
        return { success: true, data: this.cache[category] };
      }
      
      // In a real implementation, this would be an actual web scraping operation
      // For now, we'll simulate scraping by generating mock data
      const products: ProductCardProps[] = [];
      
      // Generate 15-30 random products
      const productCount = 15 + Math.floor(Math.random() * 15);
      
      // Check if it's a food category
      const isFood = category.toLowerCase() === 'food' || category.toLowerCase().includes('food');
      
      // Use food delivery platforms for food category, otherwise use e-commerce sites
      const sourcePlatforms = isFood ? this.foodDeliveryPlatforms : this.supportedSites;
      
      for (let i = 0; i < productCount; i++) {
        // Generate between 3 and 6 sources for each product
        const sourceCount = 3 + Math.floor(Math.random() * 4);
        const sources = [];
        
        // Generate a base price between $50 and $1000 for regular products
        // For food, generate a price between $5 and $50
        const basePrice = isFood 
          ? 5 + Math.floor(Math.random() * 45) 
          : 50 + Math.floor(Math.random() * 950);
        
        // Add random sources with varying prices
        for (let j = 0; j < sourceCount; j++) {
          const siteIndex = Math.floor(Math.random() * sourcePlatforms.length);
          const site = sourcePlatforms[siteIndex];
          
          // Create price variations (±15% from base price)
          const priceFactor = 0.85 + (Math.random() * 0.3);
          const price = Math.round(basePrice * priceFactor * 100) / 100;
          
          sources.push({
            name: site.name,
            price: price,
            logo: site.logo
          });
        }
        
        // Sort sources by price (lowest first) to find the lowest price
        const sortedSources = [...sources].sort((a, b) => a.price - b.price);
        const lowestPrice = sortedSources[0].price;
        
        // Generate product names based on category
        let productName = '';
        if (isFood) {
          const foodItems = [
            'Chicken Biryani', 'Margherita Pizza', 'Hamburger', 'Caesar Salad', 
            'Sushi Platter', 'Butter Chicken', 'Pasta Carbonara', 'Pad Thai',
            'Burrito Bowl', 'Fish & Chips', 'Ramen Noodles', 'Falafel Wrap',
            'Vegetable Curry', 'Steak Dinner', 'Chow Mein', 'Grilled Sandwich',
            'Seafood Paella', 'Beef Tacos', 'Mushroom Risotto', 'BBQ Ribs'
          ];
          const restaurants = [
            'Spice Palace', 'Italiano\'s', 'Burger Joint', 'Green Leaf', 
            'Tokyo Bites', 'Tandoor House', 'Pasta Paradise', 'Thai Express',
            'Mexican Grill', 'Sea Breeze', 'Noodle Bar', 'Mediterranean Delight',
            'Curry House', 'Steakhouse', 'Dragon Wok', 'Sandwich Co.',
            'Spanish Flavors', 'Taqueria', 'Italian Kitchen', 'Smokehouse'
          ];
          
          const foodIndex = i % foodItems.length;
          const restaurantIndex = i % restaurants.length;
          
          productName = `${foodItems[foodIndex]} from ${restaurants[restaurantIndex]}`;
        } else {
          productName = `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${i + 1}`;
        }
        
        products.push({
          id: `product-${category}-${i}`,
          name: productName,
          image: `/placeholder.svg`,
          rating: 3 + Math.random() * 2,
          reviewCount: 10 + Math.floor(Math.random() * 990),
          lowestPrice: lowestPrice,
          sources: sources
        });
      }
      
      // Cache the results
      this.cache[category] = products;
      
      return { success: true, data: products };
    } catch (error) {
      console.error('Error scraping products:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape products'
      };
    }
  }
  
  static async scrapeFoodItems(cuisine?: string): Promise<ScraperResponse> {
    // This is essentially an alias for scrapeProducts, but with a category of 'food'
    // If cuisine is provided, we'll use that as a subcategory (e.g., 'food-italian')
    const category = cuisine ? `food-${cuisine.toLowerCase()}` : 'food';
    return this.scrapeProducts(category);
  }
  
  static async scrapeProductDetails(productId: string): Promise<ScraperResponse> {
    // This would fetch detailed information about a specific product
    // For now, we'll just return an error
    return {
      success: false,
      error: 'Product details scraping is not implemented yet'
    };
  }
  
  static async scrapeQuickCommerceProducts(category?: string): Promise<ScraperResponse> {
    try {
      console.log(`Scraping quick commerce products for category: ${category || 'all'}`);
      
      const cacheKey = `quickcommerce-${category || 'all'}`;
      
      // Check if we have cached data
      if (this.cache[cacheKey]) {
        console.log(`Using cached data for ${cacheKey}`);
        return { success: true, data: this.cache[cacheKey] };
      }
      
      // Generate mock data for quick commerce products
      const products: ProductCardProps[] = [];
      
      // Product categories for quick commerce
      const quickCategories = [
        'Groceries', 'Fresh Vegetables', 'Fresh Fruits', 'Dairy', 'Bakery',
        'Beverages', 'Snacks', 'Household', 'Personal Care', 'Baby Products'
      ];
      
      // Filter by category if provided
      const categoriesToUse = category && category !== 'all' 
        ? quickCategories.filter(c => c.toLowerCase() === category.toLowerCase())
        : quickCategories;
      
      // Generate 15-30 random products
      const productCount = 15 + Math.floor(Math.random() * 15);
      
      const itemsByCategory = {
        'Groceries': ['Rice', 'Flour', 'Pulses', 'Oil', 'Sugar', 'Salt', 'Spices'],
        'Fresh Vegetables': ['Tomatoes', 'Potatoes', 'Onions', 'Cucumber', 'Spinach', 'Bell Peppers', 'Carrots'],
        'Fresh Fruits': ['Apples', 'Bananas', 'Oranges', 'Grapes', 'Watermelon', 'Mangoes', 'Strawberries'],
        'Dairy': ['Milk', 'Yogurt', 'Cheese', 'Butter', 'Eggs', 'Paneer', 'Cream'],
        'Bakery': ['Bread', 'Cookies', 'Cake', 'Muffins', 'Croissants', 'Donuts', 'Buns'],
        'Beverages': ['Water', 'Soda', 'Juice', 'Tea', 'Coffee', 'Energy Drinks', 'Milk Shakes'],
        'Snacks': ['Chips', 'Chocolate', 'Nuts', 'Popcorn', 'Biscuits', 'Candy', 'Dried Fruits'],
        'Household': ['Detergent', 'Soap', 'Toilet Paper', 'Dish Wash', 'Room Freshener', 'Cleaning Supplies', 'Tissues'],
        'Personal Care': ['Shampoo', 'Toothpaste', 'Soap', 'Face Wash', 'Moisturizer', 'Deodorant', 'Sunscreen'],
        'Baby Products': ['Diapers', 'Baby Food', 'Baby Wipes', 'Baby Soap', 'Baby Powder', 'Baby Oil', 'Baby Lotion']
      };
      
      for (let i = 0; i < productCount; i++) {
        // Randomly select a category if multiple are available
        const categoryIndex = Math.floor(Math.random() * categoriesToUse.length);
        const selectedCategory = categoriesToUse[categoryIndex];
        
        // Select a product from the category
        const items = itemsByCategory[selectedCategory as keyof typeof itemsByCategory];
        const itemIndex = i % items.length;
        const selectedItem = items[itemIndex];
        
        // Generate between 3 and 6 sources for each product
        const sourceCount = 3 + Math.floor(Math.random() * 4);
        const sources = [];
        
        // Generate a base price between $5 and $50 for quick commerce products
        const basePrice = 5 + Math.floor(Math.random() * 45);
        
        // Add random sources with varying prices
        for (let j = 0; j < sourceCount; j++) {
          const siteIndex = Math.floor(Math.random() * this.quickCommercePlatforms.length);
          const site = this.quickCommercePlatforms[siteIndex];
          
          // Create price variations (±15% from base price)
          const priceFactor = 0.85 + (Math.random() * 0.3);
          const price = Math.round(basePrice * priceFactor * 100) / 100;
          
          sources.push({
            name: site.name,
            price: price,
            logo: site.logo
          });
        }
        
        // Sort sources by price (lowest first) to find the lowest price
        const sortedSources = [...sources].sort((a, b) => a.price - b.price);
        const lowestPrice = sortedSources[0].price;
        
        // Create product name
        const productName = `${selectedItem} (${selectedCategory})`;
        
        // Add delivery time field specific to quick commerce
        sources.forEach(source => {
          source.deliveryTime = `${5 + Math.floor(Math.random() * 25)} mins`;
        });
        
        products.push({
          id: `quickcommerce-${selectedCategory}-${i}`,
          name: productName,
          image: `/placeholder.svg`,
          rating: 3 + Math.random() * 2,
          reviewCount: 10 + Math.floor(Math.random() * 990),
          lowestPrice: lowestPrice,
          sources: sources
        });
      }
      
      // Cache the results
      this.cache[cacheKey] = products;
      
      return { success: true, data: products };
    } catch (error) {
      console.error('Error scraping quick commerce products:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to scrape quick commerce products'
      };
    }
  }
  
  // This method would clear our cache to fetch fresh data
  static clearCache(): void {
    this.cache = {};
    console.log('Scraper cache cleared');
  }
}
