"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Star, Shield, ArrowLeft, Check, CheckCircle2, Truck, Award, ChevronDown, ChevronRight, Clock } from "lucide-react";
import ProductGallery from "./ProductGallery";

import ProductReviews from "./ProductReviews";
import ProductRecommendations from "./ProductRecommendations";
import ProductFeatures from "./ProductFeatures";
import ProductRichDescription from "./ProductRichDescription";
import ProductTechSpecs from "./ProductTechSpecs";
import FAQ from "./FAQ";
import AppIntegration from "./AppIntegration";
import Juul2Flavors from "./Juul2Flavors";

export default function ProductDetail({ selectedProduct, onAddToCart, setCurrentPage, theme }) {
  const isLight = theme === "light";

  const defaultProduct = {
    id: "juul-2-device-uae-slate-grey-made-in-uk",
    name: "Juul 2 Device UAE Slate Grey | Made in UK",
    category: "kits",
    version: "juul2",
    price: 120,
    rating: 4.7,
    reviewsCount: 173,
    imgColor: "#3B82F6",
    tag: "UK Edition",
    desc: "Original premium JUUL 2 device kit. Sleek look, smart features.",
    image: "https://cdn.shopify.com/s/files/1/0982/3325/4208/files/Juul-2-Device-UAE-Slate-Grey-Juul-Vape-Dubai_fd10755f-f534-494f-8d04-42dff6e51bf2.jpg?v=1783200504"
  };

  const product = selectedProduct || defaultProduct;

  // Customizer States
  const [deviceColor, setDeviceColor] = useState({ id: "slate", label: "Slate Grey", color: "#4B5563" });
  const [selectedFlavor, setSelectedFlavor] = useState({ id: "mint", label: "Cool Mint", color: "#10B981", price: 15.99 });
  const [activeFlavor, setActiveFlavor] = useState({ id: "mint", label: "Cool Mint", color: "#10B981" });
  const [packSize, setPackSize] = useState("2-Pack");
  const [nicotineLevel, setNicotineLevel] = useState("5.0%");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Dropdown States
  const [isFlavorDropdownOpen, setIsFlavorDropdownOpen] = useState(false);
  const [isNicotineDropdownOpen, setIsNicotineDropdownOpen] = useState(false);
  
  // Sticky Bottom CTA Drawer state
  const [showStickyBar, setShowStickyBar] = useState(false);


  // Reset states when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedAddons([]);
    setIsFlavorDropdownOpen(false);
    setIsNicotineDropdownOpen(false);
    if (product.category === "pods") {
      setNicotineLevel("3.0%");
      setPackSize("2-Pack");
    } else {
      setNicotineLevel("5.0%");
    }
  }, [product]);

  // Handle scroll trigger for Mobile Sticky Bottom Bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 680) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Static options
  const deviceColors = [
    { id: "slate", label: "Slate Grey", color: "#4B5563" },
    { id: "carbon", label: "Midnight Carbon", color: "#1E1E20" },
    { id: "rose", label: "Sunset Rose", color: "#E11D48" },
    { id: "cobalt", label: "Cobalt Sea", color: "#2563EB" },
    { id: "ruby", label: "Ruby Edition", color: "#DC2626" },
  ];

  const flavorPods = [
    { id: "mint", label: "Cool Mint", color: "#10B981", price: 15.99 },
    { id: "mango", label: "Royal Mango", color: "#F59E0B", price: 15.99 },
    { id: "berry", label: "Alpine Berry", color: "#EC4899", price: 16.99 },
    { id: "classic", label: "Virginia Tobacco", color: "#78716C", price: 15.99 }
  ];

  const podFlavors = [
    { id: "mint", label: "Cool Mint", color: "#10B981" },
    { id: "mango", label: "Royal Mango", color: "#F59E0B" },
    { id: "berry", label: "Ruby Sunset (Apple)", color: "#EF4444" },
    { id: "classic", label: "Virginia Tobacco", color: "#78716C" },
    { id: "menthol", label: "Classic Menthol", color: "#06B6D4" },
  ];

  const toDhs = (price) => {
    return parseFloat(price).toFixed(2);
  };

  const getRelevantAddons = () => {
    if (product.category === "pods") {
      return [
        { id: "extra-device", name: "JUUL 2 Device Kit - Slate Grey", price: 110.00, image: "/deal-bundle.png" },
        { id: "magnetic-charger", name: "Magnetic USB Charging Dock", price: 35.00, image: "/usb-dock.png" },
        { id: "leather-case", name: "Tactical Leather Carry Case", price: 70.00, image: "/deal-case.png" }
      ];
    } else {
      return [
        { id: "extra-pods", name: "JUUL 2 Pods - Polar Mint Pack", price: 65.00, image: "/cat-pods.png" },
        { id: "magnetic-charger", name: "Magnetic USB Charging Dock", price: 35.00, image: "/usb-dock.png" },
        { id: "leather-case", name: "Tactical Leather Carry Case", price: 70.00, image: "/deal-case.png" }
      ];
    }
  };

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId) 
        : [...prev, addonId]
    );
  };

  const relevantAddons = getRelevantAddons();

  const getCalculatedPrice = () => {
    return product.price;
  };

  const getAddonsPrice = () => {
    return selectedAddons.reduce((acc, addonId) => {
      const addon = relevantAddons.find(a => a.id === addonId);
      return acc + (addon ? addon.price : 0);
    }, 0);
  };

  const getProductSummary = () => {
    if (product.category === "kits") {
      return [
        { label: "Battery Capacity", value: product.version === "juul2" ? "350 mAh (Extended Life)" : "200 mAh (Classic)" },
        { label: "Charging Method", value: "Magnetic USB Quick Charge" },
        { label: "Smart Connectivity", value: product.version === "juul2" ? "Bluetooth App Linked" : "Classic (No Bluetooth)" },
        { label: "Display Lights", value: product.version === "juul2" ? "4-LED Battery Indicator" : "Single Dot Status LED" },
      ];
    } else if (product.category === "pods") {
      return [
        { label: "Liquid capacity", value: product.version === "juul2" ? "1.2 mL per Pod" : "0.7 mL per Pod" },
        { label: "Nicotine level", value: nicotineLevel },
        { label: "Cartridge count", value: packSize },
        { label: "Estimated puffs", value: product.version === "juul2" ? "Approx. 350 puffs per Pod" : "Approx. 200 puffs per Pod" },
      ];
    } else {
      return [
        { label: "Device compatibility", value: product.version === "juul2" ? "JUUL 2 Devices Only" : "JUUL 1 Devices Only" },
        { label: "Premium Materials", value: product.id === "carry-case" ? "Genuine Premium Leather" : "Anodized Alloys & Silicone" },
        { label: "Fitting interface", value: product.id === "usb-dock" ? "Magnetic Snap Charging Dock" : "Physical Secure Sleeve Fit" },
        { label: "Box Contents", value: "1x Official Accessory Module" },
      ];
    }
  };

  const totalPrice = ((getCalculatedPrice() + getAddonsPrice()) * quantity).toFixed(2);
  const originalPrice = (parseFloat(totalPrice) * 1.25).toFixed(2);

  const handleAddToCart = () => {
    let cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(getCalculatedPrice()),
      image: product.image || "/deal-bundle.png",
      imgColor: product.imgColor || "#10B981",
      customDetails: {}
    };

    if (product.category === "accessories") {
      cartItem.customDetails = {
        compatibility: product.version === "juul2" ? "JUUL 2 Compatible" : "JUUL 1 Compatible"
      };
    }

    // Add main product
    for (let i = 0; i < quantity; i++) {
      onAddToCart(cartItem);
    }

    // Add selected addons
    selectedAddons.forEach(addonId => {
      const addon = relevantAddons.find(a => a.id === addonId);
      if (addon) {
        const addonCartItem = {
          id: addon.id,
          name: addon.name,
          price: addon.price,
          image: addon.image,
          imgColor: "#4B5563",
          customDetails: {
            isAddon: "Product Add-on"
          }
        };
        for (let i = 0; i < quantity; i++) {
          onAddToCart(addonCartItem);
        }
      }
    });

    // Clear addons
    setSelectedAddons([]);
  };

  const router = useRouter();

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleProductRecommendationClick = (newProduct) => {
    if (newProduct?.id) {
      router.push(`/product/${newProduct.id}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`pt-24 pb-16 sm:pt-28 sm:pb-20 min-h-screen text-left transition-colors duration-500 ${
        isLight ? "bg-zinc-50 text-zinc-900" : "bg-[#09090A] text-white"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Breadcrumb Navigation Trail */}
        <nav className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4 select-none">
          <Link
            href="/"
            className={`transition-colors cursor-pointer ${
              isLight ? "text-zinc-400 hover:text-zinc-950" : "text-zinc-500 hover:text-white"
            }`}
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <Link
            href={product.version === "juul1" ? "/juul1" : "/juul2"}
            className={`transition-colors cursor-pointer ${
              isLight ? "text-zinc-400 hover:text-zinc-950" : "text-zinc-500 hover:text-white"
            }`}
          >
            {product.version === "juul1" ? "JUUL 1" : "JUUL 2"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className={`capitalize ${isLight ? "text-zinc-450" : "text-zinc-450"}`}>
            {product.category}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className={`truncate max-w-[150px] sm:max-w-xs ${isLight ? "text-zinc-800" : "text-zinc-300"}`}>
            {product.name}
          </span>
        </nav>

        <div className={`p-4 sm:p-6 rounded-3xl border transition-all duration-500 mb-6 ${
          isLight 
            ? "bg-white border-zinc-200/80 shadow-md shadow-zinc-100" 
            : "bg-[#0b0b0d] border-zinc-800"
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Left Column: Media Showcase (Stretches to fill height) */}
            <div className="lg:col-span-6 w-full h-full">
              <ProductGallery
                selectedProduct={product}
                deviceColor={deviceColor}
                selectedFlavor={selectedFlavor}
                theme={theme}
              />
            </div>

            {/* Right Column: Customizer & Details */}
            <div className="lg:col-span-6 space-y-4">
              {/* Header info */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {product.tag || "Verified Original Product"}
                  </span>
                </div>
                <h1 className={`text-xl sm:text-2xl font-extrabold leading-tight tracking-tight ${isLight ? "text-zinc-950" : "text-white"}`}>
                  {product.name}
                </h1>
                
                {/* Star Rating & Reviews */}
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current text-amber-500" />
                    ))}
                  </div>
                  <span className={`font-semibold text-[10px] ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                    ({product.reviewsCount || 10} reviews)
                  </span>
                  <span className="text-zinc-400 dark:text-zinc-650 text-[9px]">|</span>
                  <span className="text-emerald-450 font-bold uppercase tracking-wider text-[9px]">In Stock</span>
                </div>

                {/* Description */}
                <p className={`text-[11px] sm:text-xs font-light leading-snug max-w-2xl pt-0.5 ${isLight ? "text-zinc-700" : "text-zinc-350"}`}>
                  {product.desc}
                </p>

                {/* Brand line */}
                <div>
                  <span className={`text-[11px] font-semibold ${isLight ? "text-zinc-900" : "text-zinc-300"}`}>
                    Brand: Juul {product.version === "juul2" ? "2" : "1"}
                  </span>
                </div>

                {/* Gradient Divider Line */}
                <div className={`h-[1px] w-full bg-gradient-to-r ${isLight ? "from-zinc-200" : "from-white/10"} to-transparent mt-3 mb-2`} />

                {/* Price Display */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                    Price:
                  </span>
                  <span className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${isLight ? "text-zinc-950" : "text-white"}`}>
                    Dhs. {toDhs(getCalculatedPrice())}
                  </span>
                  {product.originalPrice && product.originalPrice > getCalculatedPrice() && (
                    <span className={`text-sm line-through font-semibold ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>
                      Dhs. {toDhs(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && product.originalPrice > getCalculatedPrice() && (
                    <span className="text-[10px] bg-red-500/10 text-red-500 border border-red-500/20 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Save {Math.round(((product.originalPrice - getCalculatedPrice()) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              {/* ═══ SHIPPING & DELIVERY Highlights Box ═══ */}
              <div className={`p-5 rounded-2xl border transition-all duration-300 ${
                isLight 
                  ? "bg-zinc-100/50 border-zinc-200" 
                  : "bg-[#121214] border-white/5"
              }`}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs text-left">
                  {[
                    "Free delivery on orders above 300 DHS",
                    "Cash, card & payment link on delivery",
                    "Same day delivery in Dubai, Sharjah & Ajman before 9 PM",
                    "Express delivery in Dubai",
                    "Standard delivery within 2-4 hours",
                    "Next day delivery to other Emirates"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-snug text-zinc-650 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ═══ ADD-ONS SECTION ═══ */}
              <div className="space-y-3 pt-3 border-t border-zinc-150 dark:border-white/5">
                <div className="w-full">
                  <h4 className={`w-full text-xs sm:text-[13px] uppercase font-bold tracking-widest py-2.5 px-3 rounded-lg border flex items-center justify-center gap-2.5 ${
                    isLight 
                      ? "bg-emerald-50/50 text-emerald-650 border-emerald-200/60" 
                      : "bg-emerald-500/5 text-emerald-400 border-emerald-500/10"
                  }`}>
                    <Star className="w-4 h-4 fill-current" />
                    <span>Upgrade Your Experience <span className="opacity-75 font-semibold">(Compatible Add-ons)</span></span>
                  </h4>
                </div>
                <div className={`flex flex-col gap-1 p-2 rounded-2xl border transition-all ${
                  isLight ? "bg-zinc-50/70 border-zinc-200" : "bg-[#121214] border-white/5"
                }`}>
                  {relevantAddons.slice(0, 3).map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-300 select-none ${
                          isChecked
                            ? isLight
                              ? "bg-white border border-zinc-200 shadow-sm"
                              : "bg-[#202024]/80 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                            : isLight
                            ? "bg-transparent border border-transparent hover:bg-white/50"
                            : "bg-transparent border border-transparent hover:bg-white/[0.02]"
                        }`}
                      >
                        {/* Checkbox */}
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                          isChecked 
                            ? "bg-emerald-500 border-emerald-500 text-white" 
                            : isLight ? "border-zinc-300 bg-white" : "border-white/20 bg-white/5"
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        
                        {/* Add-on Thumbnail */}
                        <div className={`w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 border ${
                          isLight ? "bg-white border-zinc-200" : "bg-[#0b0b0d] border-white/10"
                        }`}>
                          <Image 
                            src={addon.image || "/deal-bundle.png"} 
                            alt={addon.name} 
                            width={28} 
                            height={28} 
                            className="object-contain"
                          />
                        </div>

                        {/* Text & Price */}
                        <div className="flex-1 min-w-0 flex items-center justify-between gap-3">
                          <p className={`text-[11px] font-bold truncate ${isLight ? "text-zinc-850" : "text-zinc-200"}`} title={addon.name}>
                            {addon.name}
                          </p>
                          <p className="text-[10px] font-black text-emerald-500 flex-shrink-0">
                            +Dhs. {addon.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ═══ QUANTITY & TOTAL PRICE ═══ */}
              <div className="flex items-center justify-between py-1 mb-2 mt-2">
                {/* Quantity Selector */}
                <div className={`flex items-center border rounded-full px-2 justify-between w-[90px] sm:w-28 h-10 flex-shrink-0 ${
                  isLight ? "bg-white border-zinc-200 text-zinc-800" : "bg-[#202024] border-white/5 text-white"
                }`}>
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`w-7 h-7 rounded-full transition-colors font-bold text-lg cursor-pointer flex items-center justify-center ${isLight ? "hover:bg-zinc-150" : "hover:bg-white/5"}`}
                  >
                    -
                  </button>
                  <span className="text-[11px] sm:text-xs font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className={`w-7 h-7 rounded-full transition-colors font-bold text-lg cursor-pointer flex items-center justify-center ${isLight ? "hover:bg-zinc-150" : "hover:bg-white/5"}`}
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? "text-zinc-500" : "text-zinc-455"}`}>
                  Total: <span className={`font-black text-xl ml-1.5 ${isLight ? "text-zinc-950" : "text-white"}`}>Dhs. {toDhs(totalPrice)}</span>
                </span>
              </div>

              {/* ═══ CART ACTION ROW ═══ */}
              <div className="flex flex-row items-center gap-2 w-full">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer shadow-md whitespace-nowrap ${
                    isLight 
                      ? "bg-zinc-950 hover:bg-zinc-800 text-white" 
                      : "bg-white hover:bg-zinc-200 text-zinc-950"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" /> ADD TO CART
                </button>

                {/* Buy It Now */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 h-12 font-bold uppercase tracking-widest text-[10px] sm:text-xs rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] cursor-pointer bg-[#2E2E32] hover:bg-[#1A1A1D] text-white border border-zinc-700 whitespace-nowrap"
                >
                  BUY IT NOW
                </button>
              </div>


            </div>
          </div>
        </div>

        {/* Features / Trust Badges (Free Shipping, Fast Delivery etc) */}
        <ProductFeatures theme={theme} />

        {/* Dynamic SEO detailed Rich Description Showcase with Images */}
        <ProductRichDescription
          product={product}
          theme={theme}
        />

        {/* Technical Specifications */}
        <ProductTechSpecs 
          product={product} 
          theme={theme} 
        />

        {/* Compatible Pods/Flavors Grid (JUUL 2 Exclusive Section) */}
        {product.version === "juul2" && (
          <Juul2Flavors theme={theme} onAddToCart={onAddToCart} />
        )}


        {/* Companion App Integration Features (JUUL 2 Exclusive Section) */}
        {product.version === "juul2" && (
          <AppIntegration theme={theme} />
        )}

        {/* You May Also Like Suggestions */}
        <ProductRecommendations
          category={product.category}
          currentProductId={product.id}
          onProductClick={(p) => handleProductRecommendationClick(p)}
          onAddToCart={onAddToCart}
          theme={theme}
        />



        {/* Verified Reviews Section (Moved to the bottom) */}
        <ProductReviews
          productName={product.name}
          theme={theme}
        />

        {/* FAQ Section */}
        <FAQ theme={theme} />

      </div>

      {/* Mobile Sticky Bottom CTA Drawer */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t px-4 py-3 flex items-center justify-between gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] ${
              isLight ? "bg-white/95 border-zinc-200/80 backdrop-blur-md text-zinc-900" : "bg-[#09090A]/95 border-white/5 backdrop-blur-md text-white"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 flex-shrink-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden p-1 border border-zinc-200 dark:border-white/5">
                <img
                  src={product.image || "/deal-bundle.png"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black truncate max-w-[120px] sm:max-w-[200px]">
                  {product.name}
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-black ${isLight ? "text-zinc-950" : "text-white"}`}>
                    Dhs. {toDhs(totalPrice)}
                  </span>
                  <span className="text-[10px] text-zinc-500 line-through">
                    Dhs. {toDhs(originalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {/* Quick Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`p-3 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                  isLight 
                    ? "bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-900" 
                    : "bg-white/5 hover:bg-white/10 border-white/5 text-white"
                }`}
                title="Add to Cart"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>

              {/* Quick Buy Now */}
              <button
                onClick={handleBuyNow}
                className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shadow-md ${
                  isLight 
                    ? "bg-zinc-950 hover:bg-zinc-900 text-white shadow-zinc-950/20" 
                    : "bg-white hover:bg-zinc-200 text-zinc-950"
                }`}
              >
                ⚡ Buy Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
