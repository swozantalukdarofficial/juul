"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact({ theme, shopifyPage }) {
  const isLight = theme === "light";

  return (
    <div className={`min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto ${isLight ? "text-zinc-900" : "text-white"}`}>
      <div className="flex flex-col items-center text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6"
        >
          <>Get In <span className="text-red-500">Touch</span></>
        </motion.h1>
        {shopifyPage?.body ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`shopify-page-body max-w-2xl text-base text-left leading-relaxed space-y-4 ${isLight ? "text-zinc-700" : "text-zinc-300"}`}
            dangerouslySetInnerHTML={{ __html: shopifyPage.body }}
          />
        ) : (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`max-w-2xl text-lg sm:text-xl leading-relaxed ${isLight ? "text-zinc-600" : "text-zinc-400"}`}
          >
            Have questions about our products or need wholesale information? We're here to help. Reach out to us anytime.
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6 sm:gap-8"
        >
          {[
            { icon: <Phone />, title: "Call Us", detail: "+971 50 123 4567", sub: "Mon-Sat, 10am - 8pm" },
            { icon: <Mail />, title: "Email Us", detail: "support@vapepod.com", sub: "24/7 Online Support" },
            { icon: <MapPin />, title: "Visit Us", detail: "Downtown Dubai", sub: "United Arab Emirates" }
          ].map((item, idx) => (
            <div key={idx} className={`flex items-start gap-5 p-6 rounded-3xl border transition-all hover:scale-[1.02] ${
              isLight ? "bg-white border-zinc-200" : "bg-zinc-900/50 border-white/10"
            }`}>
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${
                isLight ? "bg-red-50 text-red-500" : "bg-red-500/10 text-red-400"
              }`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className={`text-lg font-medium mb-1 ${isLight ? "text-zinc-800" : "text-zinc-200"}`}>{item.detail}</p>
                <p className={`text-sm ${isLight ? "text-zinc-500" : "text-zinc-500"}`}>{item.sub}</p>
              </div>
            </div>
          ))}

          {/* Social Media Links */}
          <div className={`mt-8 pt-8 border-t ${isLight ? "border-zinc-200" : "border-white/10"}`}>
            <h3 className={`text-lg font-bold mb-6 ${isLight ? "text-zinc-950" : "text-white"}`}>Follow Us</h3>
            <div className="flex items-center gap-4">
              {[
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>, 
                  link: "#", 
                  label: "Facebook" 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>, 
                  link: "#", 
                  label: "Twitter" 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, 
                  link: "#", 
                  label: "Instagram" 
                },
                { 
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, 
                  link: "#", 
                  label: "LinkedIn" 
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  aria-label={social.label}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                    isLight 
                      ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-950" 
                      : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-8 sm:p-10 rounded-3xl border ${
            isLight ? "bg-white border-zinc-200" : "bg-zinc-900/50 border-white/10"
          }`}
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>First Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    isLight ? "bg-zinc-50 border-zinc-200" : "bg-black/50 border-white/10 text-white"
                  }`}
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>Last Name</label>
                <input 
                  type="text" 
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                    isLight ? "bg-zinc-50 border-zinc-200" : "bg-black/50 border-white/10 text-white"
                  }`}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>Email Address</label>
              <input 
                type="email" 
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
                  isLight ? "bg-zinc-50 border-zinc-200" : "bg-black/50 border-white/10 text-white"
                }`}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-bold ${isLight ? "text-zinc-700" : "text-zinc-300"}`}>Message</label>
              <textarea 
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 transition-all resize-none ${
                  isLight ? "bg-zinc-50 border-zinc-200" : "bg-black/50 border-white/10 text-white"
                }`}
                placeholder="How can we help you?"
              />
            </div>

            <button 
              type="submit"
              className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] ${
                isLight ? "bg-zinc-950 text-white hover:bg-zinc-800" : "bg-white text-zinc-950 hover:bg-zinc-200"
              }`}
            >
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
