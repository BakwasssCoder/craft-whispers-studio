import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SiteLoader from "./components/SiteLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import CustomOrder from "./pages/CustomOrder";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminHeroBanners from "./pages/admin/AdminHeroBanners";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminSiteContent from "./pages/admin/AdminSiteContent";
import AdminOrders from "./pages/admin/AdminOrders";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Initial load - show loader briefly
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isAdminRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/hero-banners" element={<AdminHeroBanners />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/faq" element={<AdminFaq />} />
          <Route path="/admin/site-content" element={<AdminSiteContent />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <SiteLoader isLoading={isLoading} />
      <Header />
      <main className="pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/custom-order" element={<CustomOrder />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingWhatsAppButton />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;