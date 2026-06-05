"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import TrustBar from "./TrustBar";
import ShopByCategory from "./ShopByCategory";
import BestSellers from "./BestSellers";
import FlashDeals from "./FlashDeals";
import AppIntegration from "./AppIntegration";
import FlavorTeaser from "./FlavorTeaser";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import NewArrivals from "./NewArrivals";

import Juul360Viewer from "./Juul360Viewer";
import HappyClients from "./HappyClients";
import FAQ from "./FAQ";
import SEOContentBlock from "./SEOContentBlock";
import BlogSection from "./BlogSection";

export default function Home({ 
  setCurrentPage, 
  setCategoryFilter, 
  setVersionFilter,
  onAddToCart, 
  setSelectedProduct, 
  theme 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "linear" }}
      className="w-full overflow-hidden"
    >
      {/* 2. Hero Section */}
      <HeroSection 
        setCurrentPage={setCurrentPage} 
        setCategoryFilter={setCategoryFilter}
        setVersionFilter={setVersionFilter}
        theme={theme} 
      />

      {/* 3. Trust Bar */}
      <TrustBar theme={theme} />

      {/* 4. Shop by Category */}
      <ShopByCategory 
        setCurrentPage={setCurrentPage} 
        setCategoryFilter={setCategoryFilter} 
        theme={theme} 
      />

      {/* 5. Featured Collection -> Best Sellers */}
      <BestSellers 
        onAddToCart={onAddToCart}
        setCurrentPage={setCurrentPage}
        setSelectedProduct={setSelectedProduct}
        theme={theme}
      />

      {/* 5.5 Flash Deals — Special Offers & Discounts */}
      <FlashDeals
        onAddToCart={onAddToCart}
        theme={theme}
      />



      {/* 6. Shop by Flavor */}
      <FlavorTeaser setCurrentPage={setCurrentPage} theme={theme} />

      {/* 7. Why Choose Us (Rich Text + Multicolumn) */}
      <Features theme={theme} />

      {/* 7.5 How It Works (Educational workflow for new users) */}
      <HowItWorks theme={theme} />

      {/* 8. Featured Collection -> New Arrivals */}
      <NewArrivals 
        onAddToCart={onAddToCart}
        setCurrentPage={setCurrentPage}
        setSelectedProduct={setSelectedProduct}
        theme={theme}
      />

      {/* JUUL App Integration */}
      <AppIntegration theme={theme} />

      {/* Interactive 3D 360-degree Product Lab Viewer */}
      <Juul360Viewer theme={theme} />

      {/* 9. Happy Clients - Infinite Auto-Scroll Marquee */}
      <HappyClients theme={theme} />


      {/* 10. FAQ (Collapsible rows) */}
      <FAQ theme={theme} />

      {/* 11. SEO Content Block */}
      <SEOContentBlock theme={theme} />

      {/* 12. Blog / Journal Section (Right above Footer) */}
      <BlogSection theme={theme} />
    </motion.div>
  );
}
