
// Mock data for development purposes

// Product Categories
export const productCategories = [
  { 
    id: 'electronics', 
    name: 'Electronics', 
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147', 
    count: 120 
  },
  { 
    id: 'home-appliances', 
    name: 'Home Appliances', 
    image: 'https://images.unsplash.com/photo-1574269906883-67810cb1bd23', 
    count: 75 
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3', 
    count: 200 
  },
  { 
    id: 'beauty', 
    name: 'Beauty', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348', 
    count: 90 
  },
  { 
    id: 'books', 
    name: 'Books', 
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d', 
    count: 150 
  },
  { 
    id: 'sports', 
    name: 'Sports', 
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', 
    count: 85 
  }
];

// Movie Categories
export const movieCategories = [
  { 
    id: 'action', 
    name: 'Action', 
    image: 'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6', 
    count: 45 
  },
  { 
    id: 'comedy', 
    name: 'Comedy', 
    image: 'https://images.unsplash.com/photo-1483225280852-715131383333', 
    count: 60 
  },
  { 
    id: 'drama', 
    name: 'Drama', 
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728', 
    count: 75 
  },
  { 
    id: 'scifi', 
    name: 'Sci-Fi', 
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa', 
    count: 30 
  },
  { 
    id: 'horror', 
    name: 'Horror', 
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366', 
    count: 40 
  },
  { 
    id: 'animation', 
    name: 'Animation', 
    image: 'https://images.unsplash.com/photo-1534103362078-d07e750bd0c4', 
    count: 50 
  }
];

// Featured Products
export const featuredProducts = [
  {
    id: 'p1',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    rating: 8.7,
    reviewCount: 1245,
    lowestPrice: 299.99,
    currency: '$',
    sources: [
      { name: 'Amazon', price: 299.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
      { name: 'BestBuy', price: 329.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png' },
      { name: 'Walmart', price: 309.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Walmart_Spark.svg/200px-Walmart_Spark.svg.png' }
    ]
  },
  {
    id: 'p2',
    name: 'Apple iPad Pro 11-inch',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    rating: 9.2,
    reviewCount: 987,
    lowestPrice: 799.99,
    currency: '$',
    sources: [
      { name: 'Amazon', price: 799.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
      { name: 'Apple', price: 799.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/180px-Apple_logo_black.svg.png' },
      { name: 'BestBuy', price: 799.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png' }
    ]
  },
  {
    id: 'p3',
    name: 'Samsung 55-inch QLED 4K Smart TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1',
    rating: 8.5,
    reviewCount: 765,
    lowestPrice: 649.99,
    currency: '$',
    sources: [
      { name: 'Amazon', price: 649.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
      { name: 'BestBuy', price: 699.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png' },
      { name: 'Samsung', price: 699.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png' }
    ]
  },
  {
    id: 'p4',
    name: 'Dyson V11 Cordless Vacuum Cleaner',
    image: 'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc',
    rating: 8.9,
    reviewCount: 543,
    lowestPrice: 499.99,
    currency: '$',
    sources: [
      { name: 'Amazon', price: 549.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
      { name: 'BestBuy', price: 499.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png' },
      { name: 'Dyson', price: 549.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Dyson_logo.svg/200px-Dyson_logo.svg.png' }
    ]
  },
  {
    id: 'p5',
    name: 'Bose QuietComfort 45 Headphones',
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605',
    rating: 8.8,
    reviewCount: 432,
    lowestPrice: 279.99,
    currency: '$',
    sources: [
      { name: 'Amazon', price: 279.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
      { name: 'BestBuy', price: 299.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png' },
      { name: 'Bose', price: 299.99, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Bose_logo.svg/200px-Bose_logo.svg.png' }
    ]
  }
];

// Featured Movies
export const featuredMovies = [
  {
    id: 'm1',
    title: 'Dune: Part Two',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820',
    year: 2024,
    rating: 8.6,
    reviewCount: 2345,
    sources: [
      { name: 'IMDb', rating: 8.5, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png' },
      { name: 'Rotten Tomatoes', rating: 9.2, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png' },
      { name: 'Metacritic', rating: 8.1, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png' }
    ]
  },
  {
    id: 'm2',
    title: 'The Batman',
    poster: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3',
    year: 2022,
    rating: 8.2,
    reviewCount: 1876,
    sources: [
      { name: 'IMDb', rating: 8.0, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png' },
      { name: 'Rotten Tomatoes', rating: 8.5, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png' },
      { name: 'Metacritic', rating: 8.0, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png' }
    ]
  },
  {
    id: 'm3',
    title: 'Barbie',
    poster: 'https://images.unsplash.com/photo-1469131792215-9c5eda70d1ee',
    year: 2023,
    rating: 7.8,
    reviewCount: 2156,
    sources: [
      { name: 'IMDb', rating: 7.2, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png' },
      { name: 'Rotten Tomatoes', rating: 8.9, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png' },
      { name: 'Metacritic', rating: 7.5, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png' }
    ]
  },
  {
    id: 'm4',
    title: 'Oppenheimer',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9',
    year: 2023,
    rating: 9.0,
    reviewCount: 2789,
    sources: [
      { name: 'IMDb', rating: 8.9, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png' },
      { name: 'Rotten Tomatoes', rating: 9.3, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png' },
      { name: 'Metacritic', rating: 8.8, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png' }
    ]
  },
  {
    id: 'm5',
    title: 'Inside Out 2',
    poster: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf',
    year: 2023,
    rating: 8.7,
    reviewCount: 1658,
    sources: [
      { name: 'IMDb', rating: 8.6, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png' },
      { name: 'Rotten Tomatoes', rating: 8.9, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png' },
      { name: 'Metacritic', rating: 8.5, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png' }
    ]
  }
];

// Detailed product example for product detail page
export const detailedProduct = {
  id: 'p1',
  name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
  images: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df'
  ],
  description: 'Industry-leading noise cancellation with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls.',
  brand: 'Sony',
  rating: 8.7,
  reviewCount: 1245,
  lowestPrice: 299.99,
  currency: '$',
  sources: [
    { 
      name: 'Amazon', 
      price: 299.99, 
      url: 'https://amazon.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
      inStock: true
    },
    { 
      name: 'BestBuy', 
      price: 329.99, 
      url: 'https://bestbuy.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Best_Buy_Logo.svg/220px-Best_Buy_Logo.svg.png',
      inStock: true
    },
    { 
      name: 'Walmart', 
      price: 309.99, 
      url: 'https://walmart.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Walmart_Spark.svg/200px-Walmart_Spark.svg.png',
      inStock: true
    },
    { 
      name: 'B&H Photo', 
      price: 319.99, 
      url: 'https://bhphotovideo.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/B%26H_Photo_Video_Logo.svg/200px-B%26H_Photo_Video_Logo.svg.png',
      inStock: false
    }
  ],
  reviews: {
    amazon: {
      rating: 8.8,
      count: 745,
      highlights: [
        { text: "Excellent noise cancellation, much better than previous models", sentiment: "positive" },
        { text: "Battery life is impressive, lasting for days on a single charge", sentiment: "positive" },
        { text: "Comfortable for extended wear, even with glasses", sentiment: "positive" },
        { text: "The app can be buggy at times", sentiment: "negative" },
        { text: "Expensive compared to competitors", sentiment: "negative" }
      ]
    },
    bestbuy: {
      rating: 8.6,
      count: 321,
      highlights: [
        { text: "Sound quality is exceptional across all frequencies", sentiment: "positive" },
        { text: "Multi-device connection works seamlessly", sentiment: "positive" },
        { text: "Touch controls are intuitive and responsive", sentiment: "positive" },
        { text: "Case is a bit bulky for travel", sentiment: "negative" },
        { text: "Some users reported connection issues on Windows PCs", sentiment: "negative" }
      ]
    },
    walmart: {
      rating: 8.5,
      count: 179,
      highlights: [
        { text: "Great value for the features and quality", sentiment: "positive" },
        { text: "Voice assistant integration works perfectly", sentiment: "positive" },
        { text: "Earcups are very comfortable for long sessions", sentiment: "positive" },
        { text: "Not as durable as expected at this price point", sentiment: "negative" },
        { text: "Microphone quality could be better for calls", sentiment: "negative" }
      ]
    }
  },
  specifications: [
    { name: "Form Factor", value: "Over Ear" },
    { name: "Connectivity Technology", value: "Bluetooth 5.0, NFC, 3.5mm audio cable" },
    { name: "Battery Life", value: "Up to 30 hours" },
    { name: "Noise Cancellation", value: "Active Noise Cancellation" },
    { name: "Microphone", value: "Built-in with voice pickup" },
    { name: "Weight", value: "8.96 ounces" },
    { name: "Additional Features", value: "Speak-to-chat, wearing detection, DSEE Extreme audio upscaling" }
  ]
};

// Detailed movie example for movie detail page
export const detailedMovie = {
  id: 'm1',
  title: 'Dune: Part Two',
  poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820',
  backdrop: 'https://images.unsplash.com/photo-1469723979811-64c16cbfcd00',
  year: 2024,
  runtime: 166,
  director: 'Denis Villeneuve',
  cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Josh Brolin', 'Javier Bardem'],
  genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi'],
  plot: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.',
  rating: 8.6,
  reviewCount: 2345,
  sources: [
    { 
      name: 'IMDb', 
      rating: 8.5, 
      url: 'https://imdb.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/200px-IMDB_Logo_2016.svg.png',
      reviewCount: 1540
    },
    { 
      name: 'Rotten Tomatoes', 
      rating: 9.2, 
      url: 'https://rottentomatoes.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/200px-Rotten_Tomatoes.svg.png',
      reviewCount: 425
    },
    { 
      name: 'Metacritic', 
      rating: 8.1, 
      url: 'https://metacritic.com', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/200px-Metacritic_logo.svg.png',
      reviewCount: 380
    }
  ],
  reviews: {
    critics: [
      {
        author: "David Ehrlich",
        publication: "IndieWire",
        rating: 9.0,
        content: "Denis Villeneuve's 'Dune: Part Two' is a monumental achievement in sci-fi filmmaking that builds upon its predecessor in every way. The visual grandeur is matched by emotional depth and thematic richness."
      },
      {
        author: "Leah Greenblatt",
        publication: "Entertainment Weekly",
        rating: 8.5,
        content: "The second installment delivers on the epic scale and philosophical underpinnings of Herbert's novel while maintaining a surprisingly intimate focus on character."
      },
      {
        author: "K. Austin Collins",
        publication: "Rolling Stone",
        rating: 8.7,
        content: "The rare sequel that not only matches but exceeds the original, with performances that resonate and action sequences that stun without overwhelming the story's more contemplative elements."
      }
    ],
    audience: [
      {
        username: "SciFiFan88",
        rating: 9.5,
        content: "Everything I wanted from a Dune sequel. The spice harvester scene alone was worth the price of admission."
      },
      {
        username: "MovieBuff2024",
        rating: 8.0,
        content: "Visually stunning with a great score. Some parts dragged, but overall a satisfying conclusion to Paul's journey."
      },
      {
        username: "HerbertDiehard",
        rating: 9.0,
        content: "As a fan of the books, I appreciated how faithful it was to the source material while still working as a cinematic experience."
      }
    ]
  }
};
