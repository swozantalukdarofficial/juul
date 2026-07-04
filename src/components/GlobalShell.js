"use client";

import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FloatingSocials from "@/components/FloatingSocials";

export default function GlobalShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    theme,
    setTheme,
    handleRemoveFromCart,
  } = useApp();

  return (
    <div
      className={`min-h-screen flex flex-col justify-between overflow-x-hidden font-sans transition-colors duration-500 ${theme === "light" ? "bg-white text-zinc-900" : "bg-[#09090A]"
        }`}
    >
      <Navbar
        currentPath={pathname}
        cartCount={cart.length}
        setIsCartOpen={setIsCartOpen}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="flex-1 w-full relative">{children}</main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        theme={theme}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
      />

      <FloatingSocials theme={theme} />

      <Footer theme={theme} />
    </div>
  );
}
