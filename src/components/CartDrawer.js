"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartDrawer({ isOpen, onClose, cart, onRemoveFromCart, setCurrentPage, theme }) {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  const isLight = theme === "light";

  const handleCheckoutClick = () => {
    onClose();
    setCurrentPage("checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[80] cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed right-0 top-0 h-screen w-full sm:max-w-[400px] border-l z-[80] shadow-2xl flex flex-col transition-colors duration-500 overflow-hidden ${
              isLight ? "bg-white border-zinc-200" : "bg-[#0A0A0B] border-white/5"
            }`}
          >
            {/* Header */}
            <div className={`px-5 py-4 border-b flex items-center justify-between gap-2 flex-shrink-0 ${isLight ? "border-zinc-100" : "border-white/5"}`}>
              <div className={`flex items-center gap-2 min-w-0 overflow-hidden ${isLight ? "text-zinc-900" : "text-white"}`}>
                <ShoppingBag className={`w-4 h-4 flex-shrink-0 ${isLight ? "text-blue-600" : "text-emerald-400"}`} />
                <span className="font-bold uppercase tracking-wider text-xs truncate">Shopping Cart ({cart.length})</span>
              </div>
              <button 
                onClick={onClose}
                className={`p-1.5 rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                  isLight ? "hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900" : "hover:bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className={`w-12 h-12 ${isLight ? "text-zinc-300" : "text-zinc-700"}`} />
                  <p className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-zinc-400" : "text-zinc-500"}`}>Your cart is empty</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center justify-between p-4 border rounded-2xl transition-colors ${
                      isLight ? "bg-zinc-50 border-zinc-150" : "bg-white/[0.01] border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div 
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `${item.imgColor || '#4B5563'}40` }}
                      />
                      <div className="text-left min-w-0 flex-1 overflow-hidden">
                        <p className={`text-xs font-bold truncate ${isLight ? "text-zinc-850" : "text-white"}`}>{item.name}</p>
                        <p className={`text-[10px] font-black mt-0.5 ${isLight ? "text-zinc-900" : "text-zinc-500"}`}>Dhs. {(parseFloat(item.price) * 4.725).toFixed(2)}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveFromCart(index)}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isLight ? "hover:bg-red-50 text-zinc-400 hover:text-red-600" : "hover:bg-red-500/10 text-zinc-500 hover:text-red-400"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className={`p-5 border-t backdrop-blur-md space-y-4 flex-shrink-0 transition-colors duration-500 ${
                isLight ? "border-zinc-100 bg-zinc-50/80" : "border-white/5 bg-[#0D0D0E]/80"
              }`}>
                <div className="flex justify-between items-end text-left">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Subtotal</p>
                    <p className="text-xs text-zinc-400 font-light mt-0.5">Taxes & shipping added at checkout</p>
                  </div>
                  <span className={`text-2xl font-black ${isLight ? "text-zinc-950" : "text-white"}`}>Dhs. {(total * 4.725).toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className={`w-full font-black uppercase tracking-widest text-xs py-4 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] cursor-pointer ${
                    isLight 
                      ? "bg-zinc-950 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-950/15" 
                      : "bg-emerald-400 hover:bg-emerald-300 text-black shadow-emerald-400/20"
                  }`}
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
