"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Vaping: From Clunky Mods to Sleek Pods",
    excerpt: "Explore how vape technology has drastically improved over the last decade, culminating in minimal, sophisticated devices.",
    category: "Technology",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    imgUrl: "https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "How to Choose the Right Nicotine Strength for Your Pod",
    excerpt: "Finding the perfect nicotine level is crucial for a satisfying experience. Here is our comprehensive guide to selecting the right pod.",
    category: "Guides",
    date: "Oct 08, 2023",
    readTime: "4 min read",
    imgUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Caring for Your Device: Battery Maintenance Tips",
    excerpt: "Maximize the lifespan of your vape battery with these daily maintenance and charging best practices.",
    category: "Tips & Tricks",
    date: "Sep 28, 2023",
    readTime: "3 min read",
    imgUrl: "https://images.unsplash.com/photo-1620052566052-8176882250da?q=80&w=800&auto=format&fit=crop"
  }
];

export default function BlogSection({ theme }) {
  const isLight = theme === "light";

  return (
    <section className={`py-24 transition-colors duration-500 relative overflow-hidden ${
      isLight ? "bg-white" : "bg-[#040405]"
    }`}>
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-3">
            <span className={`text-xs font-bold uppercase tracking-widest ${
              isLight ? "text-blue-600" : "text-emerald-400"
            }`}>
              Latest Journal
            </span>
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
              isLight ? "text-zinc-950" : "text-white"
            }`}>
              Vape Culture & News
            </h2>
            <p className={`text-sm font-light max-w-lg leading-relaxed ${
              isLight ? "text-zinc-500" : "text-zinc-400"
            }`}>
              Stay updated with the latest industry news, maintenance guides, and expert tips for an elevated vaping experience.
            </p>
          </div>
          
          <button className={`hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors group ${
            isLight ? "text-zinc-900 hover:text-blue-600" : "text-white hover:text-emerald-400"
          }`}>
            View All Articles 
            <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
              isLight ? "bg-zinc-100 group-hover:bg-blue-50" : "bg-white/5 group-hover:bg-emerald-500/10"
            }`}>
              <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              className={`group flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                isLight 
                  ? "bg-zinc-50 border-zinc-200 hover:shadow-zinc-200/50" 
                  : "bg-zinc-950/40 border-white/5 hover:border-white/10 hover:shadow-emerald-900/10"
              }`}
            >
              {/* Image Container */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${
                  isLight ? "bg-white/90 text-zinc-900" : "bg-black/60 text-white"
                }`}>
                  {post.category}
                </div>
                <img 
                  src={post.imgUrl} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content Container */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className={`flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest mb-4 ${
                  isLight ? "text-zinc-500" : "text-zinc-500"
                }`}>
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>

                <h3 className={`text-lg sm:text-xl font-black leading-tight mb-3 transition-colors ${
                  isLight 
                    ? "text-zinc-900 group-hover:text-blue-600" 
                    : "text-white group-hover:text-emerald-400"
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm font-light leading-relaxed mb-6 flex-1 line-clamp-3 ${
                  isLight ? "text-zinc-600" : "text-zinc-400"
                }`}>
                  {post.excerpt}
                </p>

                <div className={`flex items-center gap-2 text-xs font-bold tracking-widest uppercase mt-auto transition-colors ${
                  isLight ? "text-zinc-950 group-hover:text-blue-600" : "text-white group-hover:text-emerald-400"
                }`}>
                  Read Article
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All Button */}
        <button className={`mt-10 w-full md:hidden py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-colors ${
          isLight 
            ? "bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50" 
            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
        }`}>
          View All Articles <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
