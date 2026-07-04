"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import About from "@/components/About";
import { getShopifyPage } from "@/utils/shopify";

export default function AboutPage() {
  const { theme } = useApp();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const page = await getShopifyPage("about");
        if (page) {
          setPageData(page);
        }
      } catch (err) {
        console.error("Error loading Shopify page:", err);
      }
    }
    load();
  }, []);

  return <About theme={theme} shopifyPage={pageData} />;
}
