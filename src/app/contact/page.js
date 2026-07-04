"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import Contact from "@/components/Contact";
import { getShopifyPage } from "@/utils/shopify";

export default function ContactPage() {
  const { theme } = useApp();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const page = await getShopifyPage("contact");
        if (page) {
          setPageData(page);
        }
      } catch (err) {
        console.error("Error loading Shopify page:", err);
      }
    }
    load();
  }, []);

  return <Contact theme={theme} shopifyPage={pageData} />;
}
