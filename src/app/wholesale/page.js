"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import Wholesale from "@/components/Wholesale";
import { getShopifyPage } from "@/utils/shopify";

export default function WholesalePage() {
  const { theme } = useApp();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const page = await getShopifyPage("wholesale");
        if (page) {
          setPageData(page);
        }
      } catch (err) {
        console.error("Error loading Shopify page:", err);
      }
    }
    load();
  }, []);

  return <Wholesale theme={theme} shopifyPage={pageData} />;
}
