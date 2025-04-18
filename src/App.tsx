
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import MovieDetail from "./pages/MovieDetail";
import CategoryPage from "./pages/CategoryPage";
import FoodCategoryPage from "./pages/FoodCategoryPage";
import QuickCommercePage from "./pages/QuickCommercePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/food" element={<FoodCategoryPage />} />
          <Route path="/food/:cuisine" element={<FoodCategoryPage />} />
          <Route path="/quickcommerce" element={<QuickCommercePage />} />
          <Route path="/quickcommerce/:category" element={<QuickCommercePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
