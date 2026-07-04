"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { allProducts as defaultProducts } from "@/data/products";
import { createShopifyCheckout } from "@/utils/shopify";

const AppContext = createContext(null);

const defaultSiteContent = {
  heroTitle: "JUUL 2",
  heroSubtitle: "NEXT-GEN SATISFACTION",
  heroDesc: "Experience the future of clean vaping with the brand new JUUL 2. Sleeker body, smarter interface, and richer vapor draw.",
  promoBanner: "FREE SHIPPING IN UAE FOR ORDERS ABOVE AED 150!",
  teaserTitle: "Explore Pods",
  teaserDesc: "Authentic flavors crafted for the ultimate satisfaction. Select your device type to see available options."
};

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(defaultProducts);
  const [siteContent, setSiteContent] = useState(defaultSiteContent);

  // Persist theme in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vapepods-theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("vapepods-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Load products list from Shopify with local fallback
  useEffect(() => {
    async function loadProducts() {
      try {
        console.log("Fetching products from Shopify Storefront API proxy...");
        const res = await fetch("/api/products");
        const data = await res.json();
        const shopifyProducts = data.success ? data.products : [];
        console.log("Successfully fetched products count from Shopify API proxy:", shopifyProducts?.length || 0);
        
        if (shopifyProducts && shopifyProducts.length > 0) {
          console.log("Shopify products list:", shopifyProducts.map(p => ({ handle: p.handle, price: p.price })));
          
          // Merge Shopify products with local default products
          const merged = defaultProducts.map(local => {
            const match = shopifyProducts.find(sp => {
              const normSp = sp.handle.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalId = local.id.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalName = local.name.toLowerCase().replace(/[^a-z0-9]/g, "");
              return normSp === normLocalId || normSp === normLocalName || normSp.includes(normLocalId) || normLocalId.includes(normSp);
            });

            if (match) {
              console.log(`Merged Product Match Found: ${local.id} -> Shopify handle: ${match.handle}. Price updated: ${local.price} -> ${match.price}`);
              return {
                ...local,
                shopifyId: match.shopifyId,
                name: match.name,
                price: match.price,
                originalPrice: match.originalPrice || local.originalPrice,
                desc: match.desc || local.desc,
                image: match.image || local.image,
                images: match.images || (local.image ? [local.image] : []),
                variants: match.variants,
                shopifyVariantId: match.variants[0]?.id
              };
            }
            return local;
          });

          // Also append any shopify products that didn't match any local products
          const unmatched = shopifyProducts.filter(sp => {
            return !defaultProducts.some(local => {
              const normSp = sp.handle.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalId = local.id.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalName = local.name.toLowerCase().replace(/[^a-z0-9]/g, "");
              return normSp === normLocalId || normSp === normLocalName || normSp.includes(normLocalId) || normLocalId.includes(normSp);
            });
          });

          const finalProducts = [...merged, ...unmatched];
          setProducts(finalProducts);
          localStorage.setItem("vapepods-products", JSON.stringify(finalProducts));
        } else {
          const storedProducts = localStorage.getItem("vapepods-products");
          if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
          }
        }
      } catch (e) {
        console.error("Error loading products from Shopify:", e);
        const storedProducts = localStorage.getItem("vapepods-products");
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts));
        }
      }
    }
    loadProducts();
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("vapepods-products", JSON.stringify(newProducts));
  };

  const addProduct = (prod) => {
    const newProducts = [prod, ...products];
    saveProducts(newProducts);
  };

  const updateProduct = (id, updated) => {
    const newProducts = products.map((p) => (p.id === id ? { ...p, ...updated } : p));
    saveProducts(newProducts);
  };

  const deleteProduct = (id) => {
    const newProducts = products.filter((p) => p.id !== id);
    saveProducts(newProducts);
  };

  const resetProducts = () => {
    saveProducts(defaultProducts);
  };

  // Persist site content
  useEffect(() => {
    const storedContent = localStorage.getItem("vapepods-site-content");
    if (storedContent) {
      try {
        setSiteContent(JSON.parse(storedContent));
      } catch (e) {
        setSiteContent(defaultSiteContent);
      }
    }
  }, []);

  const updateSiteContent = (key, value) => {
    const newContent = { ...siteContent, [key]: value };
    setSiteContent(newContent);
    localStorage.setItem("vapepods-site-content", JSON.stringify(newContent));
  };

  const resetSiteContent = () => {
    setSiteContent(defaultSiteContent);
    localStorage.setItem("vapepods-site-content", JSON.stringify(defaultSiteContent));
  };

  // Persist cart in localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("vapepods-cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("vapepods-cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearCart = () => setCart([]);

  const redirectToShopifyCheckout = async () => {
    if (cart.length === 0) return;
    
    let currentProducts = products;
    if (!products.some(p => p.variants && p.variants.length > 0)) {
      try {
        console.log("Fetching latest product data before checkout...");
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success && data.products && data.products.length > 0) {
          const shopifyProducts = data.products;
          const merged = products.map(local => {
            const match = shopifyProducts.find(sp => {
              const normSp = sp.handle.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalId = local.id.toLowerCase().replace(/[^a-z0-9]/g, "");
              const normLocalName = local.name.toLowerCase().replace(/[^a-z0-9]/g, "");
              return normSp === normLocalId || normSp === normLocalName || normSp.includes(normLocalId) || normLocalId.includes(normSp);
            });
            if (match) {
              return {
                ...local,
                shopifyId: match.shopifyId,
                variants: match.variants,
                shopifyVariantId: match.variants[0]?.id
              };
            }
            return local;
          });
          currentProducts = merged;
          setProducts(merged);
        }
      } catch (e) {
        console.error("Failed to fetch latest products for checkout:", e);
      }
    }

    const skippedItems = [];
    const lineItems = [];

    for (const item of cart) {
      const matchedProd = currentProducts.find(p => p.id === item.id);
      const variantId = item.variantId || matchedProd?.variants?.[0]?.id || matchedProd?.shopifyVariantId;
      
      const isValidShopifyId = typeof variantId === 'string' && (variantId.startsWith('gid://') || variantId.startsWith('Z2lkOi8v'));

      if (isValidShopifyId) {
        lineItems.push({
          variantId: variantId,
          quantity: item.quantity || 1
        });
      } else {
        skippedItems.push(item.name || "Accessory");
      }
    }

    if (lineItems.length === 0) {
      alert("None of the items in your cart can be checked out online. Please add devices or pods to checkout.");
      return;
    }

    if (skippedItems.length > 0) {
      const skippedNames = [...new Set(skippedItems)].join(", ");
      alert(`Note: The following items are not available for online checkout and have been skipped: ${skippedNames}. You can complete your order for devices/pods.`);
    }

    try {
      const checkoutUrl = await createShopifyCheckout(lineItems);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Failed to initiate checkout. Please try again or verify your Shopify settings.");
      }
    } catch (err) {
      console.error("Checkout redirection error:", err);
      alert("An error occurred while creating checkout.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        theme,
        setTheme,
        selectedProduct,
        setSelectedProduct,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        siteContent,
        updateSiteContent,
        resetSiteContent,
        handleAddToCart,
        handleRemoveFromCart,
        handleClearCart,
        redirectToShopifyCheckout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
