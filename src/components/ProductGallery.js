"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ZoomIn, LayoutGrid, Sparkles, Layers } from "lucide-react";
import JuulDevice from "./JuulDevice";

export default function ProductGallery({ selectedProduct, deviceColor, selectedFlavor, theme }) {
  const isLight = theme === "light";
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset active thumbnail when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsZoomed(false);
  }, [selectedProduct]);

  // Determine colors and visual indicators
  const activeColor = selectedProduct?.imgColor || selectedFlavor?.color || "#10B981";

  // Create a list of gallery images based on the product images
  const getGalleryImages = () => {
    if (!selectedProduct) return [];
    
    // If the product has multiple images, map them
    if (selectedProduct.images && selectedProduct.images.length > 0) {
      return selectedProduct.images.map((url, idx) => ({
        type: "image",
        label: `${selectedProduct.name} - View ${idx + 1}`,
        url: url
      }));
    }
    
    const baseImage = selectedProduct.image || "/deal-bundle.png";
    return [
      { type: "image", label: selectedProduct.name, url: baseImage }
    ];
  };

  const images = getGalleryImages();
  const currentView = images[activeImageIndex];

  // Render pod cartridge vector
  const renderPodCartridge = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 select-none">
        <motion.div 
          initial={{ y: 20, rotate: -5, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative w-28 h-52 rounded-2xl border flex flex-col items-center justify-between p-3 shadow-2xl transition-all duration-300 ${
            isLight ? "bg-zinc-900 border-zinc-950" : "bg-black border-white/5"
          }`}
          style={{ boxShadow: `0 25px 60px ${activeColor}15` }}
        >
          {/* Mouthpiece */}
          <div className="w-full h-14 bg-zinc-950 rounded-xl border-b border-black flex items-center justify-center">
            <div className="w-10 h-2 bg-zinc-850 rounded-full opacity-60" />
          </div>
          {/* E-Liquid Window (shows selected flavor color) */}
          <div className="relative w-full h-24 bg-[#111112] rounded-xl flex items-center justify-center overflow-hidden border border-white/5">
            <div 
              className="absolute bottom-0 w-full transition-all duration-500 opacity-90" 
              style={{ height: "70%", backgroundColor: activeColor }}
            />
            {/* Liquid Bubbles */}
            <div className="absolute bottom-1/2 left-3 w-1.5 h-1.5 rounded-full bg-white/30 blur-[0.5px] animate-pulse" />
            <div className="absolute bottom-1/3 right-4 w-2 h-2 rounded-full bg-white/20 blur-[0.5px]" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[9px] font-black uppercase text-white/40 tracking-widest text-center">
              JUUL POD
            </div>
          </div>
          {/* Contacts */}
          <div className="w-full flex justify-around p-1">
            <div className="w-3.5 h-1 bg-amber-400/90 rounded-sm" />
            <div className="w-3.5 h-1 bg-amber-400/90 rounded-sm" />
          </div>
        </motion.div>
        <p className={`text-[10px] font-bold uppercase tracking-widest ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
          Smart NFC Cartridge Preview
        </p>
      </div>
    );
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      {/* Main Preview Screen */}
      <div className={`relative flex flex-col items-center justify-center border rounded-3xl p-6 overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] h-full transition-colors duration-300 ${
        isLight ? "bg-white border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)]" : "bg-zinc-950/40 border-white/5"
      }`}>


        {/* Zoom & View indicator Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          {images.length > 1 && (
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${
              isLight ? "bg-zinc-100 border-zinc-200 text-zinc-650" : "bg-white/5 border-white/10 text-zinc-400"
            }`}>
              {currentView?.type === "device_render" && <Sparkles className="w-3 h-3 text-emerald-400" />}
              {currentView?.type === "cartridge_render" ? "Smart NFC Chip" : "Gallery View"}
            </div>
          )}
          <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto ${
            isLight ? "hover:bg-zinc-100 text-zinc-650" : "hover:bg-white/10 text-zinc-400"
          }`}>
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* The Product Graphic (Render or Image) */}
        <div className="w-full flex-1 flex items-center justify-center pointer-events-none mt-4 sm:mt-0">
          <AnimatePresence mode="wait">
            {currentView?.type === "device_render" ? (
              <motion.div
                key="device-render"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center scale-110 sm:scale-125 lg:scale-150"
              >
                <JuulDevice 
                  activeFlavor={selectedFlavor?.id || "mint"} 
                  flavorColor={activeColor} 
                  theme={theme}
                />
              </motion.div>
            ) : currentView?.type === "cartridge_render" ? (
              <div key="cartridge-render" className="w-full h-full flex items-center justify-center scale-125 sm:scale-150">
                {renderPodCartridge()}
              </div>
            ) : (
              <motion.div
                key={activeImageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center"
              >
                <Image
                  src={currentView?.url || "/deal-bundle.png"}
                  alt={`Buy Authentic ${selectedProduct?.name} - ${currentView?.label} Packaging View UAE`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Summary Info Pill */}
        {images.length > 1 && (
          <div className={`absolute bottom-4 text-center px-4 py-1.5 rounded-full border ${
            isLight ? "bg-zinc-100 border-zinc-200 text-zinc-650" : "bg-white/5 border-white/10 text-zinc-400"
          }`}>
            <span className="text-[10px] uppercase font-black tracking-widest">
              {selectedProduct?.category === "kits" 
                ? `Preview: Slate Grey + ${selectedFlavor?.label || "Mint"} Pod`
                : `${selectedProduct?.name} - View ${activeImageIndex + 1}`}
            </span>
          </div>
        )}
      </div>

      {/* Alternative Image Thumbnails */}
      {images.length > 1 && (
        <div 
          className={`flex gap-2.5 py-2 px-1 overflow-x-auto max-w-full scrollbar-hide snap-x snap-mandatory ${
            images.length > 5 ? "justify-start" : "justify-start md:justify-center"
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveImageIndex(idx);
              }}
              className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0 snap-center rounded-xl border overflow-hidden p-1 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? isLight
                    ? "border-zinc-950 bg-white shadow-md scale-105"
                    : "border-white bg-white/10 scale-105"
                  : isLight
                  ? "border-zinc-200 bg-white hover:border-zinc-350 opacity-70"
                  : "border-white/5 bg-transparent hover:border-white/20 opacity-60"
              }`}
            >
              {img.type === "device_render" ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-[8px] font-black uppercase text-emerald-400 rounded-lg">
                  <span>Smart</span>
                  <span>3D</span>
                </div>
              ) : img.type === "cartridge_render" ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-[8px] font-black uppercase text-purple-400 rounded-lg">
                  <span>NFC</span>
                  <span>Pod</span>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <Image
                    src={img.url}
                    alt={`Thumbnail detail: ${img.label}`}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Full-Screen Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 select-none"
          >
            {/* Close trigger */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Lightbox Content Showcase */}
            <div className="relative max-w-2xl max-h-[60vh] w-full h-full flex items-center justify-center p-4">
              {currentView?.type === "device_render" ? (
                <div className="scale-125 transform transition-transform">
                  <JuulDevice 
                    activeFlavor={selectedFlavor?.id || "mint"} 
                    flavorColor={activeColor} 
                    theme="dark"
                  />
                </div>
              ) : currentView?.type === "cartridge_render" ? (
                <div className="scale-125 transform transition-transform">
                  {renderPodCartridge()}
                </div>
              ) : (
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-80 h-80 sm:w-[450px] sm:h-[450px]"
                >
                  <Image
                    src={currentView?.url || "/deal-bundle.png"}
                    alt={`Zoom view: ${selectedProduct?.name}`}
                    fill
                    className="object-contain"
                    sizes="500px"
                    priority
                  />
                </motion.div>
              )}
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Label & Counter Info */}
            <div className="text-center mt-6 space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {selectedProduct?.name}
              </h4>
              <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest">
                {currentView?.label} — {activeImageIndex + 1} of {images.length}
              </p>
            </div>

            {/* Thumbnail Navigation Inside Lightbox */}
            <div className="flex gap-2.5 mt-8 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border p-0.5 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-emerald-400 bg-emerald-500/10 scale-105"
                      : "border-white/10 bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {img.type === "device_render" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-[6px] font-black uppercase text-emerald-400 rounded">
                      <span>3D</span>
                    </div>
                  ) : img.type === "cartridge_render" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-[6px] font-black uppercase text-purple-400 rounded">
                      <span>NFC</span>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <Image
                        src={img.url}
                        alt={`Zoom thumbnail detail ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
