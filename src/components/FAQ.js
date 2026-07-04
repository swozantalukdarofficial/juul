import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { getShopifyPage } from "@/utils/shopify";

export default function FAQ({ theme }) {
  const isLight = theme === "light";
  const [openIndex, setOpenIndex] = useState(null);

  const [faqs, setFaqs] = useState([
    {
      q: "What is the JUUL 1 Kit and what comes in the box?",
      a: "The JUUL 1 Kit is a compact closed pod vaping device. Designed for adult users who want a simple and satisfying experience. When you open the box you will find the JUUL 1 device itself, a magnetic USB charging dock and a starter pack of JUUL pods. Everything you need to get started is right there in the box. No complicated setup and no technical knowledge required."
    },
    {
      q: "How do I use the JUUL 1 device?",
      a: "Using JUUL 1 is about as simple as it gets. Just take a flavor pod and click it into the top of the device. The magnetic connection will hold it firmly in place. Once the pod is in, simply inhale from the mouthpiece. The device is inhale activated. So there are no buttons to press or settings to adjust. It just works the moment you draw from it."
    },
    {
      q: "What pods are compatible with the JUUL 1 device?",
      a: "The JUUL 1 device is compatible with JUUL 1 pods. These are pre-filled closed pods that come in a range of flavors including Virginia Tobacco and Menthol. Always make sure you are using genuine JUUL pods for the best performance and safety."
    },
    {
      q: "How long does a JUUL pod last?",
      a: "This really depends on how often you use it. For a moderate user one JUUL pod can last through a full day of use. If you vape more frequently you may find yourself changing a little faster."
    },
    {
      q: "How do I check the battery level on my JUUL 1?",
      a: "Checking your battery is really easy. Just give the device a gentle double tap and the LED indicator will light up to show you the current battery level. A green light means you are good to go. Yellow means the battery is getting low and it is worth thinking about charging soon. A red light means the battery is nearly empty and it is time to plug in."
    },
    {
      q: "How do I charge the JUUL 1 device?",
      a: "Charging JUUL 1 is very straightforward. Place the device onto the magnetic USB charging dock. Make sure it connects securely. You will notice the LED light up during charging to let you know it is working. Once fully charged the light will turn solid green."
    },
    {
      q: "How do I know if my JUUL 1 device is genuine and authentic?",
      a: "Always buy your JUUL 1 Kit from a trusted and authorized vape store in the UAE. Genuine JUUL devices come in properly sealed premium packaging with all the correct branding and labeling."
    },
    {
      q: "Is the JUUL 1 Kit compliant with UAE regulations?",
      a: "Yes. The JUUL 1 Kit and compatible JUUL pods available in our store are fully compliant with ESMA regulations and UAE vape safety standards. The available pod flavors including Virginia Tobacco and Menthol are approved for sale in the UAE market."
    }
  ]);

  useEffect(() => {
    async function loadFaqs() {
      try {
        const page = await getShopifyPage("faq");
        if (page && page.body) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(page.body, "text/html");
          const items = [];
          
          // Look for heading tags like H3, H4, or strong elements as questions
          const questionElements = doc.querySelectorAll("h3, h4, p strong, li strong");
          
          questionElements.forEach((el) => {
            const questionText = el.textContent.trim();
            if (!questionText) return;
            
            // Find the subsequent paragraphs/content until the next question element
            let answerText = "";
            let sibling = el.parentElement?.tagName === "P" || el.parentElement?.tagName === "LI" 
              ? el.parentElement.nextElementSibling 
              : el.nextElementSibling;
              
            while (sibling) {
              const text = sibling.textContent.trim();
              if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(sibling.tagName)) {
                break;
              }
              if (sibling.querySelector("strong")) {
                break;
              }
              if (text) {
                answerText += (answerText ? "\n\n" : "") + text;
              }
              sibling = sibling.nextElementSibling;
            }
            
            if (questionText && answerText) {
              items.push({ q: questionText, a: answerText });
            }
          });
          
          if (items.length > 0) {
            setFaqs(items);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic FAQs from Shopify:", err);
      }
    }
    loadFaqs();
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-24 border-b transition-colors duration-500 ${
      isLight ? "bg-white" : "bg-[#09090A]"
    }`}>
      <div className="max-w-3xl mx-auto px-6 text-left">
        {/* Section Header */}
        <div className="space-y-3 mb-12 text-center">
          <span className={`text-xs font-bold uppercase tracking-widest ${
            isLight ? "text-zinc-400" : "text-zinc-500"
          }`}>
            Got Questions?
          </span>
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? isLight
                      ? "bg-zinc-50 border-zinc-300"
                      : "bg-white/[0.02] border-white/20"
                    : isLight
                    ? "bg-white border-zinc-200 hover:border-zinc-300"
                    : "bg-transparent border-white/5 hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer text-left"
                >
                  <span className={`text-sm sm:text-base font-bold ${
                    isLight ? "text-zinc-950" : "text-white"
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full border ${
                    isLight ? "border-zinc-200" : "border-white/10"
                  }`}>
                    {isOpen ? (
                      <Minus className={`w-3.5 h-3.5 ${isLight ? "text-zinc-700" : "text-zinc-350"}`} />
                    ) : (
                      <Plus className={`w-3.5 h-3.5 ${isLight ? "text-zinc-750" : "text-white"}`} />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-6 text-xs sm:text-sm font-light leading-relaxed ${
                        isLight ? "text-zinc-500 border-t border-zinc-200 pt-4" : "text-zinc-400 border-t border-white/5 pt-4"
                      }`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
