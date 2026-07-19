"use client";

import { motion } from "framer-motion";
import WholesaleHero from "./WholesaleHero";
import WholesaleBenefits from "./WholesaleBenefits";
import WholesaleCatalog from "./WholesaleCatalog";
import WholesaleCompliance from "./WholesaleCompliance";
import WholesaleForm from "./WholesaleForm";
import WholesaleHowItWorks from "./WholesaleHowItWorks";
import WholesaleFAQ from "./WholesaleFAQ";

export default function Wholesale({ theme, shopifyPage }) {
  const isLight = theme === "light";

  if (shopifyPage) {
    return (
      <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 w-full max-w-4xl mx-auto ${isLight ? "text-zinc-900" : "text-white"}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8 text-left"
        >
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-8">
            {shopifyPage.title}
          </h1>
          <div 
            className={`shopify-page-body text-base leading-relaxed space-y-6 ${isLight ? "text-zinc-700" : "text-zinc-300"}`}
            dangerouslySetInnerHTML={{ __html: shopifyPage.body }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-500 ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#050506] text-white"
      }`}
    >
      {/* 1. Hero Section */}
      <WholesaleHero theme={theme} />

      {/* 2. Value Proposition / Why Choose Us? */}
      <WholesaleBenefits theme={theme} />

      {/* 3. Product Catalog Preview */}
      <WholesaleCatalog theme={theme} />

      {/* 4. Regulatory Compliance & Age Verification */}
      <WholesaleCompliance theme={theme} />

      {/* 5. Wholesale Inquiry Form */}
      <WholesaleForm theme={theme} />

      {/* 6. How It Works */}
      <WholesaleHowItWorks theme={theme} />

      {/* 7. FAQ Section */}
      <WholesaleFAQ theme={theme} />
    </motion.div>
  );
}
